import { Loader } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useUser } from '../../api/hooks/useUser';
import { APIError } from '../../components/misc/apiError/APIError';
import { UserDisplayProfile } from './UserDisplayProfile';
import { UserEditProfile } from './UserEditProfile';

export const UserProfile = (): ReactElement => {
    const [edit, setEdit] = useState(false);

    const { user, isLoading, isError } = useUser();

    const toggleEdit = () => {
        setEdit(!edit);
    };

    if (isError) return <APIError error={isError} />;
    if (isLoading || !user) return <Loader />;

    return edit ? (
        <UserEditProfile toggleEdit={toggleEdit} originalUser={user} />
    ) : (
        <UserDisplayProfile toggleEdit={toggleEdit} user={user} />
    );
};
