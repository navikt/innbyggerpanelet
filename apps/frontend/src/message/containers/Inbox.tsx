import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { Email } from '@navikt/ds-icons';
import { ReactElement } from 'react';
import { PageHeader } from '../../common/components/pageHeader';
import { AlertMessage } from '../components/';

interface IProps {
    messages: IMessage[];
}
export const Inbox = ({ messages }: IProps): ReactElement => {
    return (
        <>
            <PageHeader title="Mine meldinger" icon={<Email />} />
            {messages.map((message, index) => (
                <AlertMessage key={index} message={message} />
            ))}
        </>
    );
};
