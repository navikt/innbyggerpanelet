import { Accordion, BodyShort, Heading, Loader } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCandidatesByUserId } from '../../api/hooks/useCandidate';
import { APIError } from '../../components/misc/apiError/APIError';

interface IProps {
    id: number;
}

export function UserPerformedInsight({ id }: IProps): ReactElement {
    const { candidatures, isLoading, isError } = useCandidatesByUserId(id);

    if (isError) return <APIError error={isError} />;
    if (isLoading) return <Loader />;
    if (!candidatures) return <BodyShort>Ikke deltatt i innsiktsarbeid</BodyShort>;

    return (
        <div>
            <Heading size="large">Tidligere innsiktsarbeid</Heading>
            <Accordion>
                {candidatures.map(({ insight }, i) => (
                    <Accordion.Item key={i}>
                        <Accordion.Header>{insight.name}</Accordion.Header>
                        <Accordion.Content>{insight.description}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}
