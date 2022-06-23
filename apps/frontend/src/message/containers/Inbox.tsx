import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { ReactElement } from 'react';
import { AlertMessage } from '../components/';

interface IProps {
    messages: IMessage[];
}
export const Inbox = ({ messages }: IProps): ReactElement => {
    return (
        <>
            {messages.map((message, index) => (
                <AlertMessage key={index} message={message} />
            ))}
        </>
    );
};
