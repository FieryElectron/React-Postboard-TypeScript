import styles from './CreatePostField.module.css';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { toast } from 'react-toastify';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    selectPostContent,
    selectPost,
    selectToken,
    getPosts,
    setPostContent,
} from '../PostBoardPage/postBoardPageSlice';

const refreshAccessToken = async (tokenUrl: string) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const CreatePostField = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const postContent = useAppSelector(selectPostContent);
    const postUrl = useAppSelector(selectPost);
    const tokenUrl = useAppSelector(selectToken);


    const tryCreatePost = async () => {
        const res = await axios.post(postUrl, {content:postContent}, { withCredentials: true });

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
                const resSecond = await axios.post(postUrl, {content:postContent}, { withCredentials: true });
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

    const contentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPostContent(e.target.value));
    }

    return (
        <div data-testid='createPostFieldContainer'  className={styles.createPostFieldContainer}>
            <Input placeholder='Post Content' onChange={contentOnChange}/>
            <Button text='Create' color='#38DD38' onClick={tryCreatePost} />
        </div>
    )
}

CreatePostField.defaultProps = {
    text: 'text',
}

export default CreatePostField;