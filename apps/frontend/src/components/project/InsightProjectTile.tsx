import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Detail, Heading, Panel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';

import style from './Project.module.scss';

interface IProps {
    insightProject: IInsightProject;
}

export const InsightProjectTile = ({
    insightProject,
}: IProps): ReactElement => {
    const { id, name, description, start, end } = insightProject;

    return (
        <div className={style.projectTile}>
            <Link to={`/prosjekt/${id}`}>
                <Heading size="medium">{name}</Heading>
            </Link>
            <BodyShort>{description}</BodyShort>
            <Detail size="small">
                {start} - {end}
            </Detail>
        </div>
    );
};
