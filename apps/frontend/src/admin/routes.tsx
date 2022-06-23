import { Route } from 'react-router-dom';
import { AdminPanel, CriteriaAdministration, EmployeeAdministration } from './pages';

const adminRoutes = () => (
    <>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/kriterier" element={<CriteriaAdministration />} />
        <Route path="/admin/ansatte" element={<EmployeeAdministration />} />
    </>
);

export default adminRoutes;
