import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { Close } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './ProjectTeamMembers.module.scss';

interface IProps {
    project: IInsightProject;
    edit?: (project: IInsightProject) => void;
}

export const ProjectTeamMembers = ({ project, edit }: IProps): ReactElement => {
    const deleteUser = (user: IUser) => {
        if (!edit) return console.warn('Not in edit mode.');

        const filteredUsers = project.members.filter((u) => u.id !== user.id);
        edit({ ...project, members: filteredUsers });
    };

    return (
        <>
            {project.members.map((member, index) => (
                <div key={index} className={style.listItem}>
                    <BodyShort>{`${member.firstname} ${member.surname}`}</BodyShort>
                    {edit ? <Close onClick={() => deleteUser(member)} title="Fjern medlem fra prosjekt" /> : null}
                </div>
            ))}
        </>
    );
};
