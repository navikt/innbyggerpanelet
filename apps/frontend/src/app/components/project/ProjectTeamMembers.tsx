import { IUser } from '@innbyggerpanelet/api-interfaces';
import { BodyShort } from '@navikt/ds-react';
import { ReactElement } from 'react';

interface IProps {
    member: IUser;
}

export const ProjectTeamMember = ({ member }: IProps): ReactElement => {
    return (
        <div>
            <BodyShort size="small">{member.name}</BodyShort>
        </div>
    );
};
