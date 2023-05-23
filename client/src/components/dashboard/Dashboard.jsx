import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Last30Days from './Last30Days';
import HotThisWeek from './HotThisWeek';
import NextWeek from './NextWeek';
import ReleaseCalendar from './ReleaseCalendar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Routes>
        <Route path="last-30-days" element={<Last30Days />} />
        <Route path="hot-this-week" element={<HotThisWeek />} />
        <Route path="next-week" element={<NextWeek />} />
        <Route path="release-calendar" element={<ReleaseCalendar />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
