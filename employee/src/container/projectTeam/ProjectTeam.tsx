import { Search } from '@navikt/ds-icons'
import { Button, Label } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { ProjectTeamSearchModal } from '../../components/modals/ProjectTeamSearchModal'
import { ProjectTeamMembers } from '../../components/projectTeamMembers/ProjectTeamMembers'
import { IInsightProject } from '../../types'
import style from './ProjectTeam.module.scss'

interface IProps {
    edit?: (project: IInsightProject) => void;
    project: IInsightProject;
}

export const ProjectTeam = ({ project, edit }: IProps): ReactElement => {
    const [memberModal, setMemberModal] = useState(false)

    return (
        <div className={style.wrapper}>
            <Label>Teammedlemmer:</Label>
            <ProjectTeamMembers project={project} edit={edit} />
            {edit ? (
                <Button variant="secondary" className={style.clickIcon} onClick={() => setMemberModal(true)}>
                    <Search /> Søk etter ansatte
                </Button>
            ) : null}
            {edit ? (
                <ProjectTeamSearchModal
                    project={project}
                    setProject={edit}
                    open={memberModal}
                    close={() => setMemberModal(false)}
                />
            ) : null}
        </div>
    )
}