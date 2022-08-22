import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCandidateByInsightId } from '../../common/api/hooks';
import { acceptCandidature, declineCandidature } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { InsightConsentForm } from '../../common/containers/insightConsentForm';
import { useFormatValidationErrors } from '../../common/hooks';
import DeclineConsentModal from '../components/DeclineConsentModal';
import style from './CitizenInsightInvitationPage.module.scss';

export const CitizenInsightInvitationPage = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { candidate, loading, error } = useCandidateByInsightId(id);
    const [candidateValidationErrors, setCandidateValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const [openDeclineModal, setOpenDeclineModal] = useState<boolean>(false);

    const handleAccept = async () => {
        if (!candidate) return;
        const { response, error, validationErrors } = await acceptCandidature(candidate);
        if (error) return setPutError(error);
        if (validationErrors) return setCandidateValidationErrors(validationErrors);
        if (response) return navigate('/innbygger/deltagelser');
    };

    const handleDecline = async () => {
        if (!candidate) return;
        const { response, error, validationErrors } = await declineCandidature(candidate);
        if (error) return setPutError(error);
        if (validationErrors) return setCandidateValidationErrors(validationErrors);
        if (response) return navigate('/innbygger/deltagelser');
    };

    return (
        <>
            <Panel>
                {candidate ? (
                    <>
                        <InsightConsentForm insight={candidate.insight} />

                        {candidate.hasConsented ? (
                            <div className={style.buttons}>
                                <Button variant="danger" onClick={() => setOpenDeclineModal(!openDeclineModal)}>
                                    Trekk samtykke
                                </Button>
                                <Link to="/innbygger/deltagelser">
                                    <Button as="div">Tilbake til deltagelser</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className={style.buttons}>
                                <Button variant="danger" onClick={handleDecline}>
                                Avslå
                                </Button>
                                <Button onClick={handleAccept}>Godta</Button>
                            </div>
                        )}
                    </>
                ) : (
                    <APIHandler loading={loading} error={error} />
                )}
            </Panel>
            <DeclineConsentModal 
                open={openDeclineModal} 
                setOpen={setOpenDeclineModal}
                handleDecline={handleDecline}
            />
        </>
    );
};
