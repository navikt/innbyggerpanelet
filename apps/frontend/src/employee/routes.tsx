import { Route } from 'react-router-dom';
import {
    EmployeeInsightCreationPage,
    EmployeeInsightProjectCreationPage,
    EmployeeInsightProjectDetailPage,
    EmployeeLandingPage
} from './pages';

const employeeRoutes = () => (
    <>
        <Route path="/ansatt" element={<EmployeeLandingPage />} />
        <Route path="/ansatt/prosjekt/ny" element={<EmployeeInsightProjectCreationPage />} />
        <Route path="/ansatt/prosjekt/:id" element={<EmployeeInsightProjectDetailPage />} />
        <Route path="/ansatt/prosjekt/:id/innsikt" element={<EmployeeInsightCreationPage />} />
    </>
);

export default employeeRoutes;
