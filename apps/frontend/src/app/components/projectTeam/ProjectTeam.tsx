import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { AddCircle } from '@navikt/ds-icons';
import { Label } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { ProjectTeamMembers } from './ProjectTeamMembers';

import style from './ProjectTeam.module.scss';
import { ProjectTeamSearchModal } from './ProjectTeamSearchModal';

interface IProps {
    edit?: (project: IInsightProject) => void;
    project: IInsightProject;
}

export const ProjectTeam = ({ project, edit }: IProps): ReactElement => {
    const [memberModal, setMemberModal] = useState(false);

    return (
        <>
            <div className={style.header}>
                <Label>Teammedlemmer</Label>
                {edit ? (
                    <AddCircle
                        className={style.clickIcon}
                        onClick={() => setMemberModal(true)}
                    />
                ) : null}
            </div>
            <ProjectTeamMembers project={project} edit={edit} />
            {edit ? (
                <ProjectTeamSearchModal
                    project={project}
                    setProject={edit}
                    open={memberModal}
                    close={() => setMemberModal(false)}
                />
            ) : null}
        </>
    );
};
