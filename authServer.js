require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UserService = require('./models/UserService');
const User = require('./Classes/User');
const func = require('joi/lib/types/func');

const app = express();

app.use(cookieParser());
app.use(bodyparser.json());

const rootDomain = "http://"+process.env.ROOT_DOMAIN+":";
const authPort = process.env.AUTH_PORT;
const restPort = process.env.REST_PORT;
const reactDevPort = process.env.REACT_DEV_PORT;

const apiMap = new Map();
apiMap.set('register', '/api/user/register/');
apiMap.set('login','/api/user/login/');
apiMap.set('islogin','/api/user/islogin/');
apiMap.set('logout','/api/user/logout/');
apiMap.set('token','/api/user/token/');
apiMap.set('logingoogle','/api/login/google/');

let refreshTokens = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://'+process.env.ROOT_DOMAIN+':'+restPort);
    res.header('Access-Control-Allow-Origin', 'http://'+process.env.ROOT_DOMAIN+':'+reactDevPort);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

const UserNamePasswordSchema = Joi.object().keys({
    username : Joi.string().min(3).max(10).alphanum().required(),
    password : Joi.string().min(3).max(10).alphanum().required()
});

app.get('/api/', (req, res) => {
    const completeApiMap = new Map();
    for (let [key, value] of apiMap) {
        completeApiMap.set(key,rootDomain + authPort + value);
    }

    var JsonForm = Object.fromEntries(completeApiMap);
    res.send(JsonForm);
});


app.post(apiMap.get('logingoogle'), async (req, res) => {
    const username = req.body.username;

    UserService.CreateUser(new User(username, " ","Hello"));

    const user = {username:username};
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.cookie('accessToken', accessToken, {httpOnly: true, overwrite: true});
    res.cookie('refreshToken', refreshToken, {httpOnly: true, overwrite: true});

    return res.send({flag:true, info:"Log in successfully"});
});

app.post(apiMap.get('register'), async (req, res) => {
    const joiresult = Joi.validate(req.query, UserNamePasswordSchema);

    if(joiresult.error){
        return res.send({info:joiresult.error.details[0].message});
    }

    const username = req.query.username;
    const password = req.query.password;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = UserService.CreateUser(new User(username, hashedPassword,"Hello"));

        if(result.flag){
            res.send({info:"Registered successfully!"});
        }else{
            res.send({info:result.info});
        }
    }catch(e){
        console.log(e);
        res.send({info:"Registration failed!"});
    }
});

function RootLogin(req, res, next){
    if(req.query.username == process.env.ROOT_USERNAME && req.query.password == process.env.ROOT_PASSWORD){
        const user = {username:process.env.ROOT_USERNAME};
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        res.cookie('accessToken', accessToken, {httpOnly: true, overwrite: true});
        res.cookie('refreshToken', refreshToken, {httpOnly: true, overwrite: true});
        return res.send({flag:true, info:"Log in successfully"});
    }
    next();
}

app.post(apiMap.get('login'), RootLogin, async (req, res) => {
    const joiresult = Joi.validate(req.query, UserNamePasswordSchema);

    if(joiresult.error){
        return res.send({info:joiresult.error.details[0].message});
    }

    const username = req.query.username;
    const password = req.query.password;
    const result = UserService.GetUser(new User(username));

    if(!result.flag){
        return res.send({flag:false, info:"Can't find user!"});
    }

    try{
        if(await bcrypt.compare(password, result.user.password)){
            const user = {username:username};
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            refreshTokens.push(refreshToken);

            res.cookie('accessToken', accessToken, {httpOnly: true, overwrite: true});
            res.cookie('refreshToken', refreshToken, {httpOnly: true, overwrite: true});

            return res.send({flag:true, info:"Log in successfully"});
        }else{
            return res.send({flag:false, info:"Log in failed"});
        }
    }catch{
        return res.send({flag:false, info:"Log in failed"});
    }
});

app.get(apiMap.get('token'), (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken == null){
        return res.send({flag:false});
    }

    if(!refreshTokens.includes(refreshToken)) return res.send({flag:false});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.send({flag:false});

        const accessToken = generateAccessToken({ username: user.username});
        res.cookie('accessToken', accessToken, {httpOnly: true, overwrite: true});
        return res.send({flag:true});
    })
});

app.delete(apiMap.get('logout'), (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    refreshTokens = refreshTokens.filter(token => token != refreshToken);

    res.cookie('accessToken', "", {httpOnly: true, overwrite: true});
    res.cookie('refreshToken', "", {httpOnly: true, overwrite: true});

    res.send();
});

app.get(apiMap.get('islogin'), (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken == null) return res.send(false);

    if(!refreshTokens.includes(refreshToken)) return res.send(false);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.send(false);
        return res.send(true);
    })
});

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

app.listen(authPort, () => console.log(`auth Server running on port ${authPort}`));


module.exports = app;
