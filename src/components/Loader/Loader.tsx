import {type FC} from 'react';

import styles from './index.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.LoaderWrapper}>
            <div className={styles.Loader} />
        </div>
    );
};

export default Loader;