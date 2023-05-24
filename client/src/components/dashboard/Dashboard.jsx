import Sidebar from './Sidebar';
import ReleaseCalendar from './ReleaseCalendar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <ReleaseCalendar /> 
    </div>
  );
};

export default Dashboard;
