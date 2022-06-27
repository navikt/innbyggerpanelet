import { ReactElement } from 'react';
import style from './PanelTabs.module.scss';

interface IPanelTabsProps {
    children: ReactElement[];
}

const PanelTabs = ({ children }: IPanelTabsProps): ReactElement => {
    return <div className={style.wrapper}>{children}</div>;
};

interface ITabSelectorProps {
    children: ReactElement | ReactElement[];
    active?: boolean;
    onClick?: () => void;
}

const TabSelector = ({ children, active = false, onClick }: ITabSelectorProps): ReactElement => {
    return (
        <div onClick={onClick} className={`${style.tab} ${active && style.active}`}>
            {children}
        </div>
    );
};

interface ITabContentProps {
    active?: boolean;
    children: ReactElement | ReactElement[];
}

const TabContent = ({ active = false, children }: ITabContentProps): ReactElement => {
    return <div className={!active ? style.hiddenContent : ''}>{children}</div>;
};

PanelTabs.TabSelector = TabSelector;
PanelTabs.TabContent = TabContent;
export default PanelTabs;
