import { Route } from 'react-router-dom';
import {
    CitizenCandidaturesPage,
    CitizenInsightInvitationPage,
    CitizenLandingPage,
    CitizenProfileEditPage,
    CitizenProfilePage
} from './pages';
import { RegisterCitizen } from './pages/RegisterCitizenPage';
import { RegisterCitizenConsent } from './pages/RegisterCitizenConsent';

const citizenRoutes = () => (
    <>
        <Route path="/innbygger" element={<CitizenLandingPage />} />
        <Route path="/innbygger/deltagelser" element={<CitizenCandidaturesPage />} />
        <Route path="/innbygger/registrer" element={<RegisterCitizen />} />
        <Route path="/innbygger/registrer/samtykke" element={<RegisterCitizenConsent />}/>
        <Route path="/innbygger/profil" element={<CitizenProfilePage />} />
        <Route path="/innbygger/profil/rediger" element={<CitizenProfileEditPage />} />
        <Route path="/innbygger/innsikt/:id" element={<CitizenInsightInvitationPage />} />
    </>
);

export default citizenRoutes;
