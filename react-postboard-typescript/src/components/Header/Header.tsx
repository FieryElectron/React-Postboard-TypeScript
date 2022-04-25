import styles from './Header.module.css';

import { FaUserAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';

import {
    selectLogout,
} from '../SignInPage/signInPageSlice';

import {
    selectUsername,
} from '../PostBoardPage/postBoardPageSlice';

type Props = {
    title:string
}

const Header = ({ title } : Props) => {
    const username = useAppSelector(selectUsername);
    const logoutUrl = useAppSelector(selectLogout);

    const location = useLocation();
    const navigate = useNavigate();


    const logoutOnClick = async () => {
        await axios.delete(logoutUrl, {withCredentials: true});
        navigate('/');
    }

    return (
        <div data-testid='headerContainer' className={styles.headerContainer}>
            <h1 data-testid='header' className={styles.header}>{title}</h1>
            {location.pathname === '/postboard' && username !== '' && <span className={styles.profile}><FaUserAlt color='blue' size={30} /> {username}
            <Button color='red' text='Log out' onClick={logoutOnClick}/>
            </span>}
        </div>
    )
}

Header.defaultProps = {
    title: 'title',
}

export default Header