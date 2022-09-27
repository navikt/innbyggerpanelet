import { Folder } from '@navikt/ds-icons'
import { BodyLong, BodyShort, Label } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { ProjectTeam } from '../../container/projectTeam/ProjectTeam'
import { IInsightProject } from '../../types'
import { PageHeader } from '../common/pageHeader/PageHeader'
import style from './EmployeeProjectDetails.module.scss'

interface IProps {
    project: IInsightProject;
}

export const EmployeeProjectDetails = ({ project }: IProps): ReactElement => {
    return (
        <PageHeader title={`Prosjekt: ${project.name}`} icon={<Folder />}>
            <div className={style.detailWrapper}>
                <BodyLong>{project.description}</BodyLong>
                <div className={style.detailGrid}>
                    <div className={style.date}>
                        <Label>Startdato: </Label>
                        <BodyShort>{project.start}</BodyShort>
                    </div>
                    <div className={style.date}>
                        <Label>Sluttdato: </Label>
                        <BodyShort>{project.end}</BodyShort>
                    </div>
                    <div className={style.team}>
                        <ProjectTeam project={project} />
                    </div>
                </div>
            </div>
        </PageHeader>
    )
}
