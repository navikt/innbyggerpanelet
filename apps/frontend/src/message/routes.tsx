import { Route } from 'react-router-dom';
import { MessagesPage } from './pages';

const messageRoutes = () => <Route path="/meldinger" element={<MessagesPage />} />;

export default messageRoutes;
