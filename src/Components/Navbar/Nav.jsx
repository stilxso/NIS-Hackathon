import './Nav.css'
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <nav>
      <div className="links">
        <Link className="navLink" to='/aboutUs'>About us</Link>
        <Link className="navLink" to='/profile'>Profile</Link>
        <Link className="navLink" to='/history'>History</Link>
        <Link className='navLink' to='/map'>Map</Link>
      </div>     
      <div className="logo logoNav"></div>
    </nav>
  );
}
