import React, { ReactElement } from 'react';
import style from './ErrorList.module.scss';

export default function ErrorList({ errorMessages }: { errorMessages: string[] }): ReactElement {
    return (
        <ul className={style.errorList}>
            {errorMessages.map((message, i) => (
                <li key={i}>{message}</li>
            ))}
        </ul>
    );
}
