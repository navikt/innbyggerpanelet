import setupCitizenSchedules from './citizenScheduler';
import setupInsightSchedules from './insightScheduler';

const setupScheduler = () => {
    setupCitizenSchedules();
    setupInsightSchedules();
};

export default setupScheduler;
