import { BodyLong, Detail, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { IInsightProject } from '../../types'
import style from './EmployeeCurrentProjectCard.module.scss'

export const EmployeeCurrentProjectCard = ({
    insightProject,
    id
}: {
    insightProject: IInsightProject;
    id: number;
}): ReactElement => {
    return (
        <Link to={`prosjekt/${id}`} className={style.cardContainer}>
            <Heading size="medium">{insightProject.name}</Heading>
            <BodyLong>{insightProject.description}</BodyLong>
            <div className={style.dateDetail}>
                <Detail size="small">{`${insightProject.start} - ${insightProject.end}`}</Detail>
            </div>
        </Link>
    )
}