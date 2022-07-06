import { Accordion, BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useCandidatesByCurrentUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './CitizenCandidaturesPage.module.scss';

export const CitizenCandidaturesPage = (): ReactElement => {
    const { candidates, loading, error } = useCandidatesByCurrentUser();

    return (
        <Panel className={style.wrapper}>
            <Heading size="xlarge">Deltagelser</Heading>
            <BodyLong>Her kan du se en oversikt over alle innsiktsarbeid du har deltatt i.</BodyLong>
            <Accordion>
                {candidates?.map((candidate, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{candidate.insight.name}</Accordion.Header>
                        <Accordion.Content className={style.candidatureContent}>
                            <BodyLong>{candidate.insight.description}</BodyLong>
                            <Link to={`/innbygger/innsikt/${candidate.insight.id}`}>
                                <Button as="div">Se samtykkeskjema</Button>
                            </Link>
                        </Accordion.Content>
                    </Accordion.Item>
                )) || <APIHandler loading={loading} error={error} />}
            </Accordion>
        </Panel>
    );
};
