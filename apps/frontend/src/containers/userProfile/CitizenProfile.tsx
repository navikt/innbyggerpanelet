import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { ReactElement, useState } from 'react';
import { useUser } from '../../api/hooks/useUser';
import { APIHandler } from '../../components/misc/apiHandler';
import { CitizenDisplayProfile } from './CitizenDisplayProfile';
import { CitizenEditProfile } from './CitizenEditProfile';

export const CitizenProfile = (): ReactElement => {
    const [edit, setEdit] = useState(false);

    const { user, loading, error } = useUser<ICitizen>();

    const toggleEdit = () => {
        setEdit(!edit);
    };

    if (!user) return <APIHandler error={error} loading={loading} />;

    return edit ? (
        <CitizenEditProfile toggleEdit={toggleEdit} originalCitizen={user} />
    ) : (
        <CitizenDisplayProfile toggleEdit={toggleEdit} citizen={user} />
    );
};
