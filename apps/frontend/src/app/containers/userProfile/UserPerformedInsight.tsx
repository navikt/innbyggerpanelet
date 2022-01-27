import { ICandidate, IInsight } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertyValueField';

import style from './UserPerformedInsight.module.scss';

interface IProps {
    candidatures?: ICandidate[];
}

export function UserPerformedInsight({ candidatures }: IProps): ReactElement {
    if (!candidatures)
        return <BodyShort>Ikke deltatt i innsiktsarbeid</BodyShort>;

    return (
        <div>
            <div className={style.candidatePerfomedInsight}>
                <Heading size="large">Tidligere innsiktsarbeid</Heading>
                {candidatures.map(({ insight }, i) => (
                    <>
                        <Heading size="small">{insight.name}</Heading>
                        <BodyShort>{insight.description}</BodyShort>
                    </>
                ))}
            </div>
        </div>
    );
}
