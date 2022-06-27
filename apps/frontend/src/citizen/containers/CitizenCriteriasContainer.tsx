import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import PropertyValueField from '../../common/components/propertyValueField/PropertyValueField';

interface IProps {
    criterias: ICriteria[];
}

export function CitizenCriteriasContainer({ criterias }: IProps): ReactElement {
    return (
        <>
            <Heading size="large">Egenskaper</Heading>
            {criterias?.map((criteria, index) => (
                <PropertyValueField key={index} criteria={criteria} />
            ))}
        </>
    );
}
