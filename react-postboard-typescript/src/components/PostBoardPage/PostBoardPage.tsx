import CreatePostField from '../CreatePostField/CreatePostField';
import Header from '../Header/Header';
import PageSelector from '../PageSelector/PageSelector';
import PostList from '../PostList/PostList';
import TimeSelector from '../TimeSelector/TimeSelector';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getRestApis,
    selectLoadprofile,
    selectToken,
    getUser,
    getPosts,
} from './postBoardPageSlice';

const PostBoardPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loadprofileUrl = useAppSelector(selectLoadprofile);
    const tokenUrl = useAppSelector(selectToken);


    useEffect(() => {
        dispatch(getRestApis());
    }, [dispatch]);

    useEffect(() => {
        if(loadprofileUrl && tokenUrl){
            dispatch(getUser(navigate));
            dispatch(getPosts(navigate));
        }
    }, [loadprofileUrl, tokenUrl, dispatch, navigate ]);

    return (
        <div>
            <Header title='PostBoard' />
            <CreatePostField />
            <TimeSelector />
            <PageSelector />
            <PostList />
        </div>
    )
}


export default PostBoardPage;