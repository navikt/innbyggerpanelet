import {
    EnumCandidateStatus,
    ICandidate,
    IInsight,
} from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Checkbox, Heading, Label } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { mocks } from '../../utils/mocks';

import style from './Project.module.scss';

interface IProps {
    insight: IInsight;
}

export const ProjectInsightEntry = ({ insight }: IProps): ReactElement => {
    const [open, setOpen] = useState(false);
    const [candidates, setCandidates] = useState<ICandidate[]>(
        mocks.olaCandidatures
    );

    const candidateHasCompleted = (candidate: ICandidate) => {
        return candidate.status === EnumCandidateStatus.Completed;
    };

    const candidatesCompleted = candidates.filter((c) =>
        candidateHasCompleted(c)
    ).length;

    return (
        <div className={style.wrapper}>
            <div className={style.header} onClick={() => setOpen(!open)}>
                <Heading size="large">{insight.name}</Heading>
                <BodyShort>00% relevansgradering</BodyShort>
                <BodyShort>
                    {candidatesCompleted}/{candidates.length} gjennomført
                </BodyShort>
            </div>
            {open ? (
                <div className={style.dropdown}>
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
                    <Label>Deltagere:</Label>
                    <ul className={style.entryCandidates}>
                        {candidates.map((candidate, index) => (
                            <li key={index}>
                                <div>
                                    <BodyShort>{candidate.user.name}</BodyShort>
                                    <BodyShort>00% relevansgradering</BodyShort>
                                    <Checkbox
                                        hideLabel
                                        id="insightCompleted"
                                        checked={candidateHasCompleted(
                                            candidate
                                        )}>
                                        gjennomført
                                    </Checkbox>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
