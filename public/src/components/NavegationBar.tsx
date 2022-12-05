import "../styles/navegation.css";
import {Link} from "react-router-dom";

function NavegationBar() {
  return ( 
    <div className="">
      <nav className="navegation">
        <ul className="navegation-list">
          <li><Link to="/users">Users Management</Link></li>
          <li><Link to="/groups">Group Management</Link></li>
          <li><Link to="/roles">Roles Management</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavegationBar;