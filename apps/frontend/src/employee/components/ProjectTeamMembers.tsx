import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { Delete } from '@navikt/ds-icons';
import { Table } from '@navikt/ds-react';
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
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Navn</Table.HeaderCell>
                    <Table.HeaderCell>E-Post</Table.HeaderCell>
                    <Table.HeaderCell>Rolle</Table.HeaderCell>
                    {edit ? <Table.HeaderCell></Table.HeaderCell> : null}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {project.members.map((member, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>{member.firstname + ' ' + member.surname}</Table.DataCell>
                        <Table.DataCell>{member.email}</Table.DataCell>
                        <Table.DataCell>{member.role}</Table.DataCell>
                        {edit ? (
                            <Table.DataCell>
                                <Delete className={style.clickIcon} onClick={() => deleteUser(member)} />
                            </Table.DataCell>
                        ) : null}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
