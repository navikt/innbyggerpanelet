import { Detail } from '@navikt/ds-react';
import { ReactElement } from 'react';

import style from './ProgressBar.module.scss';

interface IProps {
    label: string;
    progress: number;
}

export const ProgressBar = ({ label, progress }: IProps): ReactElement => {
    const progressString = Math.floor(progress * 100) + '%';

    return (
        <div className={style.wrapper}>
            <Detail>{label}</Detail>
            <Detail>{progressString}</Detail>
            <div className={style.bar}>
                <div
                    style={{
                        width: progressString,
                    }}></div>
            </div>
        </div>
    );
};
