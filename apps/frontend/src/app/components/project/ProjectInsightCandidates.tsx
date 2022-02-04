import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Label, Table } from '@navikt/ds-react';

interface IProps {
    candidates: ICandidate[];
}

export const ProjectInsightCandidates = ({ candidates }: IProps) => {
    return (
        <>
            <Label>Deltagere:</Label>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            Relevansgradering
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {candidates.map((candidate, index) => (
                        <Table.Row key={index}>
                            <Table.DataCell>
                                {candidate.user.name}
                            </Table.DataCell>
                            <Table.DataCell>
                                {candidate.relevancyGrading * 100}%
                            </Table.DataCell>
                            <Table.DataCell>{candidate.status}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};
