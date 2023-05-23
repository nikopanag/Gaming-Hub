import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/navbar/Login';
import Register from './components/navbar/Register';
import Preferences from './components/Preferences';
import Dashboard from './components/dashboard/Dashboard';
import TitlePage from './components/titlePage/titlePage';
/* import Test from './components/Test';  */

const App = () => {

  return (
    <Router>
      <Navbar />
      {/* <Test/> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path='/games/:id' element={<TitlePage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
};

export default App;









