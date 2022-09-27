import { Accordion, BodyLong, BodyShort, Label, Table } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useCandidatesByInsightId } from '../../api/hooks/useCandidate'
import { APIHandler } from '../../components/common/apiHandler/APIHandler'
import { ProgressBar } from '../../components/common/progressBar/ProgressBar'
import { EnumCandidateStatus, ICandidate, IInsight } from '../../types'
import { ProjectInsightCandidates } from '../projectInsightCandidates/ProjectInsightCandidates'
import style from './ProjectInsightEntry.module.scss'

interface IProps {
    insight: IInsight;
}

export const ProjectInsightEntry = ({ insight }: IProps): ReactElement => {
    const { candidates, loading, error } = useCandidatesByInsightId(insight.id)

    if (!candidates) return <APIHandler error={error} loading={loading} />

    const candidateHasCompleted = (candidate: ICandidate) => {
        return candidate.status === EnumCandidateStatus.Completed
    }

    const candidatesCompleted = candidates.filter((c: ICandidate) => candidateHasCompleted(c)).length

    const getAvgRelevancyRating = () => {
        let sum = 0
        for (const candidate of candidates) {
            sum += candidate.relevancyGrading
        }
        return sum / candidates.length
    }

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{insight.name}</Accordion.Header>
                <Accordion.Content className={style.wrapper}>
                    <BodyLong className={style.description}>{insight.description}</BodyLong>
                    <div className={style.progress}>
                        <ProgressBar label="Relevansgradering" progress={getAvgRelevancyRating()} />
                        <ProgressBar
                            label="Kandidater gjennomført"
                            progress={candidatesCompleted / candidates.length}
                        />
                    </div>
                    <div className={style.consents}>
                        <Label>Samtykker:</Label>
                        {insight.consents.map((consent, index) => (
                            <div key={index} className={style.consentCard}>
                                <Label>{consent.template.title}</Label>
                                <BodyShort>{consent.template.description}</BodyShort>
                            </div>
                        ))}
                    </div>
                    <div className={style.criteria}>
                        <Label>Kriterier:</Label>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Kriterie</Table.HeaderCell>
                                    <Table.HeaderCell>Kategori</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {insight.criterias.map((criteria, index) => (
                                    <Table.Row key={index}>
                                        <Table.DataCell>{criteria.name}</Table.DataCell>
                                        <Table.DataCell>{criteria.category.name}</Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className={style.candidates}>
                        <ProjectInsightCandidates candidates={candidates} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}
