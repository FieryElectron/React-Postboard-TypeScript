require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UserService = require('./models/UserService');
const PostService = require('./models/PostService');
const User = require('./Classes/User');
const Post = require('./Classes/Post');

app.use(express.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/react-postboard/build/'));

const rootDomain = "http://"+process.env.ROOT_DOMAIN+":";
const authPort = process.env.AUTH_PORT;
const restPort = process.env.REST_PORT;
const reactDevPort = process.env.REACT_DEV_PORT;

const apiMap = new Map();
apiMap.set('loadprofile', '/api/user/loadprofile/');
apiMap.set('user','/api/user/');
apiMap.set('token','/api/user/token/');
apiMap.set('logout','/api/user/logout/');
apiMap.set('post','/api/post/');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://'+process.env.ROOT_DOMAIN+':'+authPort);
    res.header('Access-Control-Allow-Origin', 'http://'+process.env.ROOT_DOMAIN+':'+reactDevPort);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

const PostSchema = Joi.object().keys({
    content : Joi.string().min(3).max(200).alphanum().required()
});

const DescriptionSchema = Joi.object().keys({
    description : Joi.string().min(2).max(100).alphanum().required()
});

const PostPaginationSchema = Joi.object().keys({
    from : Joi.number().positive().required(),
    to : Joi.number().positive().required(),
    page : Joi.number().positive().required()
});

app.get('/api/', (req, res) => {
    const completeApiMap = new Map();
    for (let [key, value] of apiMap) {
        if(key == 'token' || key == 'logout'){
            completeApiMap.set(key,rootDomain + authPort + value);
        }else{
            completeApiMap.set(key,rootDomain + restPort + value);
        }
    }

    var JsonForm = Object.fromEntries(completeApiMap);
    res.send(JsonForm);
});

app.post(apiMap.get('post'), authenticateToken, (req, res) => {
    const joiresult = Joi.validate(req.body, PostSchema);

    if(joiresult.error){
        return res.send({flag: false,info:joiresult.error.details[0].message});
    }

    const result = PostService.CreatePost(new Post(0, req.user.username, req.body.content, parseInt(new Date().getTime())));

    if(result.flag){
        res.send({flag: result.flag,info:"Post created!"});
    }else{
        res.send({flag: result.flag,info:"Create post failed!"});
    }
})

function RootDelete(req, res, next){
    if(req.user.username == process.env.ROOT_USERNAME){
        const id = req.params.id;

        result = PostService.DeletePost(new Post(id));
        if(result.flag){
            return res.send({flag: result.flag, info:"Post deleted!"});
        }else{
            return res.send({flag: result.flag, info:"Delete post failed!"}); 
        }
    }
    next();
}

app.delete(apiMap.get('post')+':id', authenticateToken, RootDelete, (req, res) => {
    const id = req.params.id;

    let result = PostService.GetPost(new Post(id));
    if(result.flag && result.post.username == req.user.username){
        result = PostService.DeletePost(new Post(id));
        if(result.flag){
            res.send({flag: result.flag, info:"Post deleted!"});
        }else{
            res.send({flag: result.flag, info:"Delete post failed!"}); 
        }
    }else{
        res.send({flag: false, info:"Delete post failed!"});
    }
})

app.get(apiMap.get('post'), authenticateToken, (req, res) => {
    const joiresult = Joi.validate(req.query, PostPaginationSchema);

    if(joiresult.error){
        return res.send({flag: false,info:joiresult.error.details[0].message});
    }

    const result = PostService.GetByDoubleCondition("timestamp",">=",req.query.from,"timestamp","<=",req.query.to);
    const numPostsOnePage = 3;
    const startIndex = (req.query.page - 1) * numPostsOnePage;
    const endIndex = req.query.page * numPostsOnePage;

    res.json({flag:true, posts:result.slice(startIndex,endIndex),pages:Math.ceil(result.length/numPostsOnePage)});
})

function RootLoadProfile(req, res, next){
    if(req.user.username == process.env.ROOT_USERNAME){
        return res.json({flag: true, user:{username: process.env.ROOT_USERNAME, description:"Super User!"}, master:true});
    }
    next();
}

app.get(apiMap.get('loadprofile'), authenticateToken, RootLoadProfile, (req, res) => {
    const username = req.user.username;

    const result = UserService.GetUser(new User(username));
    if(result.flag){
        res.json({flag: true, user:{username: result.user.username, description:result.user.description}});
    }else{
        res.send({flag:false});
    }
})

app.get(apiMap.get('user')+':username', authenticateToken, (req, res) => {
    const username = req.params.username;

    const result = UserService.GetUser(new User(username));
    if(result.flag){
        res.json({flag: true, user:{username: result.user.username, description:result.user.description}});
    }else{
        res.send({flag:false});
    }
})

app.patch(apiMap.get('user'), authenticateToken, (req, res) => {
    const joiresult = Joi.validate(req.body, DescriptionSchema);

    if(joiresult.error){
        return res.send({flag: false,info:joiresult.error.details[0].message});
    }

    let result = UserService.GetUser(new User(req.user.username));

    if(result.flag){
        result.user.description = req.body.description;
        result = UserService.UpdateUser(result.user);
        if(result.flag){
            res.send({flag: result.flag, info: "Description updated!"});
        }else{
            res.send({flag: result.flag, info: "Update description failed!"});
        }
    }else{
        res.send({flag: result.flag, info: "Update description failed!"});
    }
})

function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (token == null) return res.send({flag: false, refreshToken: true});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.send({flag: false, refreshToken: true});
        
        req.user = user;
        next();
    }) 
}

app.listen(restPort, () => console.log(`rest Server running on port ${restPort}`));

module.exports = app;

