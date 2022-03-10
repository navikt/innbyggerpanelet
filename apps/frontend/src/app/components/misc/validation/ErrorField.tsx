import React, { ReactElement } from 'react';
import style from './ErrorField.module.scss';

export default function ErrorField({errorMsg}: {errorMsg: string}): ReactElement {
    return(
        <ul className={style.errorField}>
            <li>{errorMsg}</li>
        </ul>
    );
}