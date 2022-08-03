import { Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './PageHeader.module.scss';

interface IProps {
    title: string;
    icon: ReactElement;
}

export const PageHeader = ({ title, icon }: IProps): ReactElement => {
    return (
        <Panel className={style.wrapper}>
            <div className={style.circleWrapper}>{icon}</div>
            <Heading size="xlarge">{title}</Heading>
        </Panel>
    );
};
