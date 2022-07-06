import { Route } from 'react-router-dom';
import {
    AdminPanel,
    ConsentTemplateAdministration,
    CriteriaAdministration,
    EmployeeAdministration,
    NewConsentTemplateAdministration
} from './pages';

const adminRoutes = () => (
    <>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/kriterier" element={<CriteriaAdministration />} />
        <Route path="/admin/ansatte" element={<EmployeeAdministration />} />
        <Route path="/admin/samtykker" element={<ConsentTemplateAdministration />} />
        <Route path="/admin/samtykker/ny" element={<NewConsentTemplateAdministration />} />
    </>
);

export default adminRoutes;
