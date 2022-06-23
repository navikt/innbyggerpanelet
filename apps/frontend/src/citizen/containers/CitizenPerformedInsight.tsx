import { Accordion, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCandidatesByUserId } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';

interface IProps {
    id: string;
}

export const CitizenPerformedInsight = ({ id }: IProps): ReactElement => {
    const { candidatures, loading, error } = useCandidatesByUserId(id);

    return (
        <>
            <Heading size="large">Tidligere innsiktsarbeid</Heading>
            <Accordion>
                {candidatures?.map(({ insight }, i) => (
                    <Accordion.Item key={i}>
                        <Accordion.Header>{insight.name}</Accordion.Header>
                        <Accordion.Content>{insight.description}</Accordion.Content>
                    </Accordion.Item>
                )) || <APIHandler error={error} loading={loading} />}
            </Accordion>
        </>
    );
};
