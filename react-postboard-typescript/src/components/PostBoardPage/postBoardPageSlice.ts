import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { fetchRestApis, fetchUser, fetchPosts} from './postBoardPageAPI';

import { NavigateFunction } from 'react-router-dom'


export interface restApisType  {
    loadprofile: string
    user: string
    token: string
    logout: string
    post: string
}

export interface userType  {
    username: string
    description: string
}

export interface PostBoardPageState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    restApis: restApisType
    user: userType
    postContent: string
    dateFrom: string
    dateTo: string
    pages: number[]
    selectedPage: number
    posts: []
}

const initialState: PostBoardPageState = {
    status: 'idle',
    restApis: {
        loadprofile: '',
        user: '',
        token: '',
        logout: '',
        post: '',
    },
    postContent: '',
    dateFrom: '',
    dateTo: '',
    pages:[1,2,3,4,5],
    selectedPage: 1,
    user: {
        username: 'asd',
        description: '',
    },
    posts: [],
};

export const getRestApis = createAsyncThunk(
    'restApis/getRestApis',
    async () => {
        const response = await fetchRestApis();
        return response;
    }
);

export const getPosts = createAsyncThunk(
    'restApis/getPosts',
    async (navigate: NavigateFunction, thunkAPI: any) => {
        const response = await fetchPosts(thunkAPI, navigate);
        return response;
    }
); 

export const getUser = createAsyncThunk(
    'restApis/getUser',
    async (navigate: NavigateFunction, thunkAPI: any) => {
        const loadprofileUrl = thunkAPI.getState().postBoardPage.restApis.loadprofile;
        const tokenUrl = thunkAPI.getState().postBoardPage.restApis.token;

        const response = await fetchUser(loadprofileUrl,tokenUrl, navigate);
        return response;
    }
);



export const postBoardPageSlice = createSlice({
    name: 'postBoardPage',
    initialState,
    reducers: {
        setPostContent: (state, action: PayloadAction<string>) => {
            state.postContent = action.payload;
        },
        setDateFrom: (state, action: PayloadAction<string>) => {
            state.dateFrom = action.payload;
        },
        setDateTo: (state, action: PayloadAction<string>) => {
            state.dateTo = action.payload;
        },
        setPages: (state, action: PayloadAction<number[]>) => {
            state.pages = action.payload;
        },
        setSelectedPage: (state, action: PayloadAction<number>) => {
            state.selectedPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRestApis.pending, (state) => {
                state.status = 'loading';
            })// Not sure how to correctly define the action type !
            .addCase(getRestApis.fulfilled, (state, action: PayloadAction<restApisType | any>) => { 
                state.status = 'success';
                state.restApis = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<userType | any>) => { 
                state.user = action.payload;
            })
            .addCase(getPosts.fulfilled, (state, action: PayloadAction<[]>) => { 
                state.posts = action.payload;
            });
    },
});

export const selectPostContent = (state: RootState) => state.postBoardPage.postContent;
export const selectPages = (state: RootState) => state.postBoardPage.pages;
export const selectSelectedPage = (state: RootState) => state.postBoardPage.selectedPage;
export const selectDateFrom = (state: RootState) => state.postBoardPage.dateFrom;
export const selectDateTo = (state: RootState) => state.postBoardPage.dateTo;



export const selectLoadprofile = (state: RootState) => state.postBoardPage.restApis.loadprofile;
export const selectUser = (state: RootState) => state.postBoardPage.restApis.user;
export const selectToken = (state: RootState) => state.postBoardPage.restApis.token;
export const selectLogout = (state: RootState) => state.postBoardPage.restApis.logout;
export const selectPost = (state: RootState) => state.postBoardPage.restApis.post;

export const selectUsername = (state: RootState) => state.postBoardPage.user.username;
export const selectPosts = (state: RootState) => state.postBoardPage.posts;


export const { setPostContent, setDateFrom, setDateTo,  setPages, setSelectedPage } = postBoardPageSlice.actions;

export default postBoardPageSlice.reducer;