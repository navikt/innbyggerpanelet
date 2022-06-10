import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { Email } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import style from './Message.module.scss';

interface IProps {
    message: IMessage;
}

export const AlertMessage = ({ message }: IProps): ReactElement => {
    return (
        <Panel>
            <div className={style.messageHeading}>
                <Email />
                <Heading size="medium">{message.title}</Heading>
            </div>
            <Detail>{message.timestamp}</Detail>
            <BodyLong>{message.description}</BodyLong>
            {message.ref && (
                <Link to={message.ref} className={style.buttonGroup}>
                    <Button>Sjekk ut</Button>
                </Link>
            )}
        </Panel>
    );
};
