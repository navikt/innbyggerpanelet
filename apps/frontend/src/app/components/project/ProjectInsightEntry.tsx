import {
    EnumCandidateStatus,
    ICandidate,
    IInsight,
} from '@innbyggerpanelet/api-interfaces';
import {
    Accordion,
    BodyShort,
    Checkbox,
    Heading,
    Label,
} from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { ProjectInsightCandidates } from '.';
import { mocks } from '../../utils/mocks';
import { ProgressBar } from '../misc/progressBar';

import style from './Project.module.scss';

interface IProps {
    insight: IInsight;
}

export const ProjectInsightEntry = ({ insight }: IProps): ReactElement => {
    const [candidates, setCandidates] = useState<ICandidate[]>(
        mocks.olaCandidatures
    );

    const candidateHasCompleted = (candidate: ICandidate) => {
        return candidate.status === EnumCandidateStatus.Completed;
    };

    const candidatesCompleted = candidates.filter((c) =>
        candidateHasCompleted(c)
    ).length;

    const getAvgRelevancyRating = () => {
        let sum = 0;
        for (const candidate of candidates) {
            sum += candidate.relevancyGrading;
        }
        return sum / candidates.length;
    };

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{insight.name}</Accordion.Header>
                <Accordion.Content>
                    <div className={style.progress}>
                        <ProgressBar
                            label="Relevansgradering"
                            progress={getAvgRelevancyRating()}
                        />
                        <ProgressBar
                            label="Kandidater gjennomført"
                            progress={candidatesCompleted / candidates.length}
                        />
                    </div>
                    <Label>Kriterier:</Label>
                    <ul>
                        {insight.criterias.map((criteria, index) => (
                            <li key={index}>{criteria.name}</li>
                        ))}
                    </ul>
                    <Label>Samtykker:</Label>
                    <ul>
                        {insight.consents.map((consent, index) => (
                            <li key={index}>{consent.description}</li>
                        ))}
                    </ul>
                    <ProjectInsightCandidates candidates={candidates} />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
