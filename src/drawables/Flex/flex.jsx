import React from 'react';
import styles from './style.module.scss';

const Flex = ({ children, flex = 'flex-start', gap = '0', className }) => {
    return (
        <div className={`${styles.flex} ${className}`} style={{ justifyContent: flex, gap }}>
            {children}
        </div>
    );
};

export default Flex;
