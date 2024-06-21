import React from 'react';
import styles from './style.module.scss';

const Flex = ({ width, height, children, flex = 'flex-start', gap = '0', className, align = 'center' }) => {
    return (
        <div className={`${styles.flex} ${className}`} style={{ justifyContent: flex, alignItems: align, gap, width, height }}>
            {children}
        </div>
    );
};

export default Flex;
