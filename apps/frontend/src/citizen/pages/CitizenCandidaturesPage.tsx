import { Findout } from '@navikt/ds-icons';
import { ReactElement } from 'react';
import { useCandidatesByCurrentUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { PageHeader } from '../../common/components/pageHeader';
import { CitizenCandidature } from '../containers';

export const CitizenCandidaturesPage = (): ReactElement => {
    const { candidates, loading, error } = useCandidatesByCurrentUser();

    return (
        <>
            <PageHeader title="Mine deltagelser" icon={<Findout />} />
            {candidates?.map((candidate, index) => <CitizenCandidature key={index} candidate={candidate} />) || (
                <APIHandler loading={loading} error={error} />
            )}
        </>
    );
};
