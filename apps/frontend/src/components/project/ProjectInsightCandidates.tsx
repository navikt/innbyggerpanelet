import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import style from './Project.module.scss';

interface IProps {
    candidates: ICandidate[];
}

export const ProjectInsightCandidates = ({ candidates }: IProps) => {
    console.log(candidates);

    candidates.map((candidate, index) => {
        if (candidate.status !== EnumCandidateStatus.Accepted && candidate.status !== EnumCandidateStatus.Completed) {
            candidate.user = {
                ...candidate.user,
                name: 'Kandidat ' + (index + 1),
                email: '*****@****.***',
                phone: '+** ********'
            };
        }
    });

    const statusEnumToElement = (status: EnumCandidateStatus) => {
        switch (status) {
            case EnumCandidateStatus.Accepted:
                return (
                    <Label size="small" className={style.labelAccepted}>
                        GODTATT SAMTYKKE
                    </Label>
                );
            case EnumCandidateStatus.Completed:
                return (
                    <Label size="small" className={style.labelCompleted}>
                        GJENNOMFØRT ARBEID
                    </Label>
                );
            case EnumCandidateStatus.Declined:
                return (
                    <Label size="small" className={style.labelDenied}>
                        AVSLÅTT
                    </Label>
                );
            case EnumCandidateStatus.Pending:
                return (
                    <Label size="small" className={style.labelPending}>
                        VENTER PÅ SVAR
                    </Label>
                );
        }
    };

    return (
        <>
            <Label>Deltagere:</Label>

            <div className={style.cardContainer}>
                {candidates.map((candidate, index) => (
                    <div key={index} className={style.card}>
                        <Heading size="small">{candidate.user.name}</Heading>
                        <BodyShort>{candidate.user.email}</BodyShort>
                        <BodyShort>{candidate.user.phone}</BodyShort>
                        {statusEnumToElement(candidate.status)}
                    </div>
                ))}
            </div>
        </>
    );
};
