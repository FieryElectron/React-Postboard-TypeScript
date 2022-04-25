import styles from './SinglePost.module.css';

import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';


import { useAppSelector, useAppDispatch } from '../../app/hooks';

import axios from 'axios';
import { toast } from 'react-toastify';

import {
    selectToken,
    selectUsername,
    selectPost,
    getPosts,
} from '../PostBoardPage/postBoardPageSlice';


const refreshAccessToken = async (tokenUrl : string) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}




const SinglePost = ( post : any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUsername = useAppSelector(selectUsername);
    const tokenUrl = useAppSelector(selectToken);
    const postUrl = useAppSelector(selectPost);


    const deletePost = async () => {
        const url = postUrl+`${post.post.id}`;
        const res = await axios.delete(url, {withCredentials: true});

        if (res.data.flag) {
            toast.info(res.data.info, {
                position: 'top-center',
                autoClose: 1000,
                pauseOnFocusLoss:false,
            });

            dispatch(getPosts(navigate));
            return;
        }

        if(res.data.info){
            toast.info(res.data.info, {
                position: 'top-center',
                autoClose: 1000,
                pauseOnFocusLoss:false,
            });
        }


        if (res.data.refreshToken) {
            if (await refreshAccessToken(tokenUrl)) {
                const resSecond = await axios.delete(url, {withCredentials: true});
                if (resSecond.data.flag) {
                    toast.info(res.data.info, {
                        position: 'top-center',
                        autoClose: 1000,
                        pauseOnFocusLoss:false,
                    });
        
                    dispatch(getPosts(navigate));
                    return;
                }
            }
        }
    
        // navigate('/');
        return;
    }

    return (
        <div data-testid='singlePostContainer' className={styles.singlePostContainer}>
            <div data-testid='ownerName'  className={styles.ownerName}>{post.post.username}</div>
            <div data-testid='postContent'  className={styles.postContent}>{post.post.content}</div>
            <hr></hr>

            <div data-testid='timeStampContainer' className={styles.timeStampContainer}>
                <span data-testid='timeStamp' className={styles.timeStamp}>{new Date(post.post.timestamp).toLocaleDateString('en-US')}</span>
                {currentUsername === post.post.username && <Button text='Delete' color='#E62E2E' onClick={deletePost}></Button>}
                
            </div>
        </div>
    )
}

SinglePost.defaultProps = {
    ownerName: 'ownerName',
    Content: 'Content',
    timestamp: 'timestamp',
}

export default SinglePost;