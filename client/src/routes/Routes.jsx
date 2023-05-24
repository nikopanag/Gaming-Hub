import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/landing/LandingPage";
import ExplorePage from "../components/explore/ExplorePage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import NotFound from "../components/notFound/404";
import TitlePage from "../components/titlePage/TitlePage";
import Dashboard from "../components/dashboard/Dashboard";
import NextWeek from "../components/dashboard/NextWeek";
import Last30Days from "../components/dashboard/Last30Days";
import HotThisWeek from "../components/dashboard/HotThisWeek";
import Library from "../components/dashboard/Library";
import Wishlist from "../components/dashboard/Wishlist";
//import Profile from "../components/userProfile/UserProfile";
import Preferences from "../components/preferences/Preferences";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/title/:category/:id" element={<TitlePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/next" element={<NextWeek />} />
      <Route path="/dashboard/last-30-days" element={<Last30Days />} />
      <Route path="/dashboard/hot-this-week" element={<HotThisWeek />} />
      <Route path="/library" element={<Library />} />
          <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/preferences" element={<Preferences />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;
