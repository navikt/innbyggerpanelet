import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { Email, EmailOpen } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { readMessage } from '../../common/api/mutations';
import style from './Message.module.scss';

interface IProps {
    message: IMessage;
}

export const AlertMessage = ({ message }: IProps): ReactElement => {
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        if (!message.read) await readMessage(message);

        setOpen(!open);
    };

    return (
        <Panel>
            <div className={style.messageHeading} onClick={handleOpen}>
                {message.read ? <EmailOpen /> : <Email />}
                <Heading size="medium">{message.title}</Heading>
                <Detail>{message.timestamp.slice(0, 10)}</Detail>
            </div>
            <div className={open ? style.open : style.closed}>
                <BodyLong>{message.description}</BodyLong>
                {message.ref && (
                    <Link to={message.ref} className={style.buttonGroup}>
                        <Button as="div">Sjekk ut</Button>
                    </Link>
                )}
            </div>
        </Panel>
    );
};
