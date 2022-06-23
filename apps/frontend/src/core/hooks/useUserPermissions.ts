import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

export const useUserPermissions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const fullPath = location.pathname;
    const subPath = fullPath.split('/')[1];

    const openSubPaths = ['', 'innlogging'];
    const citizenSubPaths = [...openSubPaths, 'innbygger'];
    const employeeSubPaths = [...openSubPaths, 'ansatt'];
    const adminSubPaths = [...employeeSubPaths, 'admin'];

    const check = (user: IUser) => {
        const { role, registered } = user;

        if (role === EnumUserRole.Citizen && !registered && fullPath !== '/innbygger/registrer')
            navigate('/innbygger/registrer');
        if (role === EnumUserRole.Citizen && registered && fullPath === '/innbygger/registrer') navigate('/innbygger');

        if (role === EnumUserRole.Citizen && !citizenSubPaths.includes(subPath)) navigate('/');
        if (role === EnumUserRole.InsightWorker && !employeeSubPaths.includes(subPath)) navigate('/');
        if (role === EnumUserRole.Admin && !adminSubPaths.includes(subPath)) navigate('/');
    };

    return check;
};
