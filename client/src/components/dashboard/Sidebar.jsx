import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';

const Sidebar = () => {
  const { user } = useContext(DataContext);
  return (
    <div className="sidebar">
      <h2>{user.username}</h2>
      <ul>
        <li>
          <NavLink to="/library" className={({ isActive }) => isActive ? 'active' : ''}>
            Library
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}>
            Wishlist
          </NavLink>
        </li>
      </ul>
      <h2>New Releases</h2>
      <ul>
        <li>
          <NavLink to="/dashboard/last-30-days" className={({ isActive }) => isActive ? 'active' : ''}>
            Last 30 Days
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/hot-this-week" className={({ isActive }) => isActive ? 'active' : ''}>
            Hot This Week
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/next-week" className={({ isActive }) => isActive ? 'active' : ''}>
            Next Week
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/release-calendar" className={({ isActive }) => isActive ? 'active' : ''}>
            Release Calendar
          </NavLink>
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
