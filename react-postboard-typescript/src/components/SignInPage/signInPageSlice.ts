import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { fetchAuthApis } from './signInPageAPI';

interface  authApisType  {
    islogin: string
    login: string
    logingoogle: string
    logout: string
    register: string
    token: string
}

export interface SignInPageState {
    username: string
    password: string
    status: 'idle' | 'loading' | 'failed' | 'success'
    authApis: authApisType
}

const initialState: SignInPageState = {
    username: '',
    password: '',
    status: 'idle',
    authApis: {
        islogin: '',
        login: '',
        logingoogle: '',
        logout: '',
        register: '',
        token: '',
    },
};

export const getAuthApis = createAsyncThunk(
    'authApis/getAuthApis',
    async () => {
        const response = await fetchAuthApis();
        return response;
    }
);

export const signInPageSlice = createSlice({
    name: 'signInPage',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthApis.pending, (state) => {
                state.status = 'loading';
            })// Not sure how to correctly define the action type !
            .addCase(getAuthApis.fulfilled, (state, action: PayloadAction<authApisType | any>) => { 
                state.status = 'success';
                state.authApis = action.payload;
            });
    },
});

export const selectUsername = (state: RootState) => state.signInPage.username;
export const selectPassword = (state: RootState) => state.signInPage.password;

export const selectRegister = (state: RootState) => state.signInPage.authApis.register;
export const selectLogin = (state: RootState) => state.signInPage.authApis.login;
export const selectIslogin = (state: RootState) => state.signInPage.authApis.islogin;
export const selectLogout = (state: RootState) => state.signInPage.authApis.logout;
export const selectToken = (state: RootState) => state.signInPage.authApis.token;
export const selectLogingoogle = (state: RootState) => state.signInPage.authApis.logingoogle;


export const { setUsername, setPassword } = signInPageSlice.actions;

export default signInPageSlice.reducer;