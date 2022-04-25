import styles from './Button.module.css';
import React from 'react';

import PropTypes from 'prop-types';

type Props = {
    color:string
    text?:string
    onClick?:React.MouseEventHandler
}

const Button = ({ color, text, onClick } : Props) => {
    return (
        <button data-testid='button' onClick={onClick} style={{ backgroundColor: color }} className={styles.button}>{text}</button>
    )
}

Button.defaultProps = {
    color: '#0071FE',
    text: 'text',
}

Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}


export default Button;