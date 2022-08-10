import { BodyShort, Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectInsightEntry } from '.';
import { useInsightsByProjectId } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import style from './EmployeeInsightProjectEntryList.module.scss';

interface IProps {
    projectId: number;
}

export const EmployeeInsightProjectEntryList = ({ projectId }: IProps): ReactElement => {
    const navigate = useNavigate();
    const { insights, loading, error } = useInsightsByProjectId(projectId);

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
                {insights?.map((insight, index) => <ProjectInsightEntry key={index} insight={insight} />) || (
                    <APIHandler error={error} loading={loading} />
                )}
            </PanelNoBackground>
        </>
    );
};
