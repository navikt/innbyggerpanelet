import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertyValueField';
import { IUser } from '@innbyggerpanelet/api-interfaces';

export function UserProperties(user: IUser): ReactElement {
    const { criterias } = user;

    return (
        <div>
            <div>
                <Heading size="large">Egenskaper</Heading>
                {criterias.map((criteria, index) => (
                    <PropertyValueField key={index} criteria={criteria} />
                ))}
            </div>
        </div>
    );
}
