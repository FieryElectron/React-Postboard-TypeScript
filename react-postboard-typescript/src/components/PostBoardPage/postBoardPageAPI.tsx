import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import $ from 'jquery';

import {
    setPages, 
    getPosts,
    setSelectedPage,
} from './postBoardPageSlice';


export async function fetchRestApis() {
    let res:any = [];
    let resJson:[] = [];
    try {
        res = await fetch(`http://` + process.env.REACT_APP_ROOT_DOMAIN + `:` + process.env.REACT_APP_REST_PORT + `/api/`);
        resJson = await res.json();
    }catch(error){
        console.error(error);
        resJson = [];
    }
    return resJson;
}

const refreshAccessToken = async (tokenUrl: string) => {
    const res = await axios.get(tokenUrl, { withCredentials: true });
    return res.data.flag;
}

export async function fetchUser(loadprofileUrl: string, tokenUrl: string, navigate: NavigateFunction) {
    const res = await axios.get(loadprofileUrl, { withCredentials: true });

    if (res.data.flag) {
        return res.data.user;
    }

    if (res.data.refreshToken) {
        if (await refreshAccessToken(tokenUrl)) {
            const resSecond = await axios.get(loadprofileUrl, { withCredentials: true });
            if (resSecond.data.flag) {
                return resSecond.data.user;
            }
        }
    }

    // navigate('/');
    return { username: '', description: '' };
}

function updatePages(totalPages: number, thunkAPI: any, navigate: NavigateFunction){
    const selectedPage = thunkAPI.getState().postBoardPage.selectedPage;
    let pages = [];
    for(let i=0;i<totalPages;++i){
        pages.push(i+1);
    }
    thunkAPI.dispatch(setPages(pages));

    if(totalPages < selectedPage && totalPages > 0){
        const lastPage : number = pages[pages.length-1];
        thunkAPI.dispatch(setSelectedPage(lastPage));
        $('#pageSelectorId').val(lastPage);
        thunkAPI.dispatch(getPosts(navigate));
    } 


}

export async function fetchPosts(thunkAPI: any, navigate: NavigateFunction) {
    const postUrl = thunkAPI.getState().postBoardPage.restApis.post;
    const tokenUrl = thunkAPI.getState().postBoardPage.restApis.token;

    const selectedPage = thunkAPI.getState().postBoardPage.selectedPage;
    const dateFrom = thunkAPI.getState().postBoardPage.dateFrom;
    const dateTo = thunkAPI.getState().postBoardPage.dateTo;

    const dateFromMillisec  = new Date(dateFrom).getTime();
    const dateToMillisec = new Date(dateTo).getTime();

    const queryUrl = postUrl + `?from=` + dateFromMillisec + `&to=` + dateToMillisec + `&page=` +selectedPage;

    const res = await axios.get(queryUrl, {withCredentials: true});

    if (res.data.flag) {
        updatePages(res.data.pages, thunkAPI, navigate);
        return res.data.posts;
    }

    if(res.data.refreshToken){
        if(await refreshAccessToken(tokenUrl)){
            const resSecond = await axios.get(queryUrl, {withCredentials: true});
            if(resSecond.data.flag){
                updatePages(resSecond.data.pages,thunkAPI, navigate);
                return resSecond.data.posts;
            }
        }
    }

    // navigate('/');
    return [];
}
