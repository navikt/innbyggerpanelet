import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';

interface IProps {
    member: IUser;
}

export const ProjectTeamMember = ({ member }: IProps): ReactElement => {
    return (
        <div>
            <Heading size="small">{member.name}</Heading>
        </div>
    );
};
