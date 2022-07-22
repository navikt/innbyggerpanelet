import { Accordion, BodyLong, Button, Heading, Panel, Search } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConsentTemplateSearchByTitle } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './ConsentTemplateAdministration.module.scss';

export const ConsentTemplateAdministration = (): ReactElement => {
    const [search, setSearch] = useState('');
    const handleChange = (input: string) => setSearch(input);

    const { consentTemplates, loading, error } = useConsentTemplateSearchByTitle(search);

    return (
        <Panel>
            <Link to="ny">
                <Button as="div">Ny samtykkemal</Button>
            </Link>
            <div className={style.wrapper}>
                <Heading size="large">Samtykkemaler</Heading>
                <Search
                    label="Søk etter samtykke"
                    variant="simple"
                    value={search}
                    onChange={handleChange}
                    hideLabel={false}
                />
                <Accordion>
                    {consentTemplates?.map((template, index) => (
                        <Accordion.Item key={index}>
                            <Accordion.Header>{template.title}</Accordion.Header>
                            <Accordion.Content>
                                <BodyLong>{template.description}</BodyLong>
                                <Link to={`/admin/samtykker/${template.id}`}>
                                    <Button as="div">Rediger</Button>
                                </Link>
                            </Accordion.Content>
                        </Accordion.Item>
                    )) || <APIHandler error={error} loading={loading} />}
                </Accordion>
            </div>
        </Panel>
    );
};
