import { BodyShort, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './LandingPage.module.scss';

export const LandingPage = (): ReactElement => {
    return (
        <>
            <img
                className={style.backgroundImage}
                src="../../../common/assets/prekestolen.jpg" //Requires longer path for some reason...
                alt="Prekestolen, hentet fra Pexels"
            />
            <div className={style.introduction}>
                <Heading size="2xlarge">Velkommen til innbyggerpanelet</Heading>
                <BodyShort>Vil du hjelpe NAV med å bli bedre? I Innbyggerpanelet kan du få sjansen!</BodyShort>
            </div>
        </>
    );
};
