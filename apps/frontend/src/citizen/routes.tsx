import { Route } from 'react-router-dom';
import { CitizenLandingPage, CitizenProfileEditPage, CitizenProfilePage, RegisterCitizen } from './pages';

const citizenRoutes = () => (
    <>
        <Route path="/innbygger" element={<CitizenLandingPage />} />
        <Route path="/innbygger/registrer" element={<RegisterCitizen />} />
        <Route path="/innbygger/profil" element={<CitizenProfilePage />} />
        <Route path="/innbygger/profil/rediger" element={<CitizenProfileEditPage />} />
    </>
);

export default citizenRoutes;