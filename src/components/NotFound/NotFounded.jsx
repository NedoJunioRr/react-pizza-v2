import React from 'react';
import styles from './NotFounded.module.scss'

const NotFounded = () => {
    return (
        <div className={styles.root}>
            <span className={styles.img}>😕</span>
            <div>
                Ничего не найдено
            </div>
        </div>
    );
};

export default NotFounded;