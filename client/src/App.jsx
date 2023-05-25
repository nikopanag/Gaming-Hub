
import NavBar from './components/navbar/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
/* import Test from "./components/Test" */
import RouterComponent from './routes/Routes';
import Footer from './components/footer/Footer';
//import { useLocation } from 'react-router-dom';

function App() {
 // const currentRoute = useLocation().pathname;
  //const excludedRoutes = ['/register', '/login'];
 // const shouldRenderFooter = !excludedRoutes.includes(currentRoute);

  return (
    <>
      <Router>
        <NavBar />
        {/* <Test /> */}
        <RouterComponent />
        {/* {shouldRenderFooter && <Footer />} */}
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;










