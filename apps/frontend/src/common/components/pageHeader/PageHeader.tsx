import { Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './PageHeader.module.scss';

interface IProps {
    title: string;
    icon: ReactElement;
    children?: ReactElement;
}

export const PageHeader = ({ title, icon, children }: IProps): ReactElement => {
    return (
        <Panel className={style.wrapper}>
            <div className={style.circleWrapper}>{icon}</div>
            <Heading size="xlarge">{title}</Heading>
            {children}
        </Panel>
    );
};
