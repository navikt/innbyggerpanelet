import React, { ReactElement } from 'react'

export default function CandidateExperiencePoints(): ReactElement {
    return (
        <div>
            <div className='experience-points-container'>
                <div className='experience-bar'></div>
                <div className='no-experience-bar'></div>
            </div>
            <div className='experience-points-info'>
                <span>Level 14</span>
                <span>70/100</span>
            </div>
        </div>
    )
}