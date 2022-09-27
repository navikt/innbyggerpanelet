import { BodyShort, Button, Heading, Label, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInsightsByProjectId } from '../../api/hooks/useInsight'
import { APIHandler } from '../../components/common/apiHandler/APIHandler'
import { PanelNoBackground } from '../../components/common/panelNoBackground/PanelNoBackground'
import { IInsight } from '../../types'
import { ProjectInsightEntry } from '../projectInsightEntry/ProjectInsightEntry'
import style from './EmployeeInsightProjectEntryList.module.scss'

interface IProps {
    projectId: number;
}

export const EmployeeInsightProjectEntryList = ({ projectId }: IProps): ReactElement => {
    const navigate = useNavigate()
    const { insights, loading, error } = useInsightsByProjectId(projectId)

    return (
        <>
            <Panel className={style.insightHeader}>
                <Heading size="large">Innsiktsarbeid</Heading>
                <Label>Antall innsiktsarbeid: {insights?.length || 0}</Label>
                <BodyShort>
                    Her er en oversikt over alle innsiktsarbeid som er gjennomført innenfor prosjektet. Du kan også
                    opprette et nytt innsitksarbeid.
                </BodyShort>

                <Button onClick={() => navigate('innsikt')}>Nytt innsiktsarbeid</Button>
            </Panel>
            <PanelNoBackground>
                {insights?.map((insight: IInsight, index: number) => <ProjectInsightEntry key={index} insight={insight} />) || (
                    <APIHandler error={error} loading={loading} />
                )}
            </PanelNoBackground>
        </>
    )
}
