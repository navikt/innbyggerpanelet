import { Loader } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useUser } from '../../api/hooks/useUser';
import { APIError } from '../../components/misc/apiError/APIError';
import { APIHandler } from '../../components/misc/apiHandler';
import { UserDisplayProfile } from './UserDisplayProfile';
import { UserEditProfile } from './UserEditProfile';

export const UserProfile = (): ReactElement => {
    const [edit, setEdit] = useState(false);

    const { user, loading, error } = useUser();

    const toggleEdit = () => {
        setEdit(!edit);
    };

    if (!user) return <APIHandler error={error} loading={loading} />;

    return edit ? (
        <UserEditProfile toggleEdit={toggleEdit} originalUser={user} />
    ) : (
        <UserDisplayProfile toggleEdit={toggleEdit} user={user} />
    );
};
