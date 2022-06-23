import { ReactElement } from 'react';
import style from './PanelNoBackground.module.scss';

interface IProps {
    children: ReactElement | ReactElement[];
    className?: string;
}

export const PanelNoBackground = ({ children, className = '' }: IProps): ReactElement => {
    return <div className={`${style.wrapper} ${className}`}>{children}</div>;
};
