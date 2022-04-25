import Header from '../Header/Header';
import Button from '../Button/Button';

import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectUsername,
    selectPassword,
    setUsername,
    setPassword,
    getAuthApis,
    selectRegister,
    selectLogin,
} from './signInPageSlice';

const clientId = process.env.REACT_APP_CLIENT_ID;

const SignInPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getAuthApis());

      function start(){
        gapi.client.init({
            clientId:clientId,
            scope:'profile',
        })
      }

      gapi.load('client:auth2', start);
    }, [dispatch]); 

    const navigate = useNavigate();

    const username = useAppSelector(selectUsername);
    const password = useAppSelector(selectPassword);


    const registerUrl = useAppSelector(selectRegister);
    const loginUrl = useAppSelector(selectLogin);
   

    const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(e.target.value));
    }

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    }

    const signUp = async () => {
        const url = registerUrl+`?username=${username}&password=${password}`;
        const res = await axios.post(url);

        toast.info(res.data.info, {
            position: 'top-center',
            autoClose: 1000,
            pauseOnFocusLoss:false,
        });
    }

    const signIn = async () => {
        const url = loginUrl+`?username=${username}&password=${password}`;
        const res = await axios.post(url, {}, {withCredentials: true});

        toast.info(res.data.info, {
            position: 'top-center',
            autoClose: 1000,
            pauseOnFocusLoss:false,
        });
        
        if(res.data.flag){
            navigate('/postboard');
            dispatch(setUsername(''));
            dispatch(setPassword(''));
        }
    }

    return (
        <div>
            <Header title='Sign In' />
            <Input placeholder='Username' onChange={usernameOnChange}/>
            <Input placeholder='Password' type='password' onChange={passwordOnChange}/>
            <br />
            <Button text='Sign Up' onClick={signUp} />
            <Button text='Sign In' onClick={signIn} />
            <br />
            <GoogleSignInButton/>

        </div>
    )
}

export default SignInPage;