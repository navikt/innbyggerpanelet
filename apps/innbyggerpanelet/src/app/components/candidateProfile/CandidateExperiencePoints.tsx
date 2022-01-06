import React, { ReactElement } from 'react';

import style from './CandidateExperiencePoints.module.scss';

export default function CandidateExperiencePoints(): ReactElement {
    return (
        <div>
            <div className={style.experiencePointsContainer}>
                <div className={style.experienceBar}></div>
                <div className={style.noExperienceBar}></div>
            </div>
            <div className={style.experiencePointsInfo}>
                <span>Level 14</span>
                <span>70/100</span>
            </div>
        </div>
    );
}