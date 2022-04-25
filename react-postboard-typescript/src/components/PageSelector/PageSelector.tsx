import styles from './PageSelector.module.css';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

import {
    selectPages,
    setSelectedPage,
    getPosts,
} from '../PostBoardPage/postBoardPageSlice';

const PageSelector = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const pages = useAppSelector(selectPages);

    const selectedPageOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const page = parseInt(e.target.value);

        dispatch(setSelectedPage(page));
        dispatch(getPosts(navigate));
    }

    return (
        <div data-testid='pageSelectorContainer' className={styles.pageSelectorContainer}>
            <span data-testid='pageSelectorTitle' className={styles.pageSelectorTitle}>Page</span>
            <select id='pageSelectorId' data-testid='pageSelectorSelect' className={styles.pageSelectorSelect} onChange={selectedPageOnChange}>
                {pages.map((value ,index,list) => <option key={value} value={value} >{value}</option>)}
            </select>
        </div>
    )
}

export default PageSelector;