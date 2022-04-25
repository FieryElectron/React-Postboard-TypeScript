import styles from './TimeSelector.module.css';
import Button from '../Button/Button'

import moment from 'moment';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { useNavigate } from 'react-router-dom';

import {
    selectDateFrom,
    selectDateTo,
    setDateFrom,
    setDateTo,
    getPosts,
} from '../PostBoardPage/postBoardPageSlice';

const TimeSelector = () => {
    const dispatch = useAppDispatch();

    const fromDate = useAppSelector(selectDateFrom);
    const toDate = useAppSelector(selectDateTo);
    const navigate = useNavigate();

    useEffect(() => {
        const dateString = moment(new Date()).format('YYYY-MM-DD');
        dispatch(setDateFrom(dateString));
        dispatch(setDateTo(dateString));
    }, [dispatch]);


    const dateFromOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDateFrom(e.target.value));
    }

    const dateToOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDateTo(e.target.value));
    }

    const RefreshPosts = () => {
        dispatch(getPosts(navigate));
    }

    return (
        <div data-testid='timeSelectorContainer' className={styles.timeSelectorContainer}>
            <h3 data-testid='timeSelectorTitle1' className={styles.timeSelectorTitle}>From</h3>
            <input data-testid='timeSelectorDate1' id='dateFrom' type='date' className={styles.timeSelectorDate} onChange={dateFromOnchange} value={fromDate}></input>
            <h3 data-testid='timeSelectorTitle2' className={styles.timeSelectorTitle}>To</h3>
            <input data-testid='timeSelectorDate2' id='dateTo' type='date' className={styles.timeSelectorDate} onChange={dateToOnchange}  value={toDate}></input>
            <Button text='Refresh Posts' onClick={RefreshPosts} />
        </div>
    )
}

export default TimeSelector;