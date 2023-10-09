import { Link, Outlet } from 'react-router-dom';
import NavBar from "./components/NavBar"
const SharedLayout = () => {
  return (
    <>
    
      <NavBar />
      <section className='section'>
        <Outlet />
      </section>
    </>
  );
};
export default SharedLayout;