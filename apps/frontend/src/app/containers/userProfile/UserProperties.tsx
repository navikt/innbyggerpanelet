import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertyValueField';
import { ICriteria } from '@innbyggerpanelet/api-interfaces';

interface IProps {
    criterias: ICriteria[];
}

export function UserCriterias({ criterias }: IProps): ReactElement {
    return (
        <>
            <Heading size="large">Egenskaper</Heading>
            {criterias.map((criteria, index) => (
                <PropertyValueField key={index} criteria={criteria} />
            ))}
        </>
    );
}
