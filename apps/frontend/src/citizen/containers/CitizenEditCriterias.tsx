import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Accordion, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaCategory } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import ErrorList from '../../common/components/validation/ErrorList';
import { IValidationError } from '../../common/hooks/';
import { CitizenEditCriteriaTable } from '../components';

interface IProps {
    citizen: ICitizen;
    setCitizen: (citizen: ICitizen) => void;
    validationErrors: IValidationError;
}

export const CitizenEditCriterias = ({ citizen, setCitizen, validationErrors }: IProps): ReactElement => {
    const { categories, loading, error } = useCriteriaCategory();

    return (
        <Panel>
            <Heading size="large">Egenskaper</Heading>
            <Accordion>
                {categories?.map((category, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Content>
                            <CitizenEditCriteriaTable
                                categoryId={category.id}
                                citizen={citizen}
                                setCitizen={setCitizen}
                            />
                        </Accordion.Content>
                    </Accordion.Item>
                )) || <APIHandler error={error} loading={loading} />}
            </Accordion>
            {validationErrors.criterias && <ErrorList errorMessages={[...validationErrors.criterias]} />}
        </Panel>
    );
};
