import { useContext } from 'react';
import '../styles/navbar.css'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
function Navbar() {
    const {user}=useContext(AuthContext)
    console.log(user?.role)
    return (  
        <nav>
            <div className="logo">
                {user?.role} Saas
            </div>
            <ul>
                <NavLink className="links" to="/">
                    Home
                </NavLink>
                <NavLink 
                    className="links"
                    to="/notes"
                >
                    Notes
                </NavLink>
                {
                    user?.role=="Admin"&&(
                        <NavLink 
                            className="links"
                            to={`/members/${user?.tenantId}`}
                        >
                            Members
                        </NavLink>
                    )
                }
                {
                    user?.role=="Admin"&&(
                        <NavLink 
                            className="links"
                            to={`/upgrade/${user?.tenantId||""}`}
                        >
                            Upgrade
                        </NavLink>
                    )
                }                
                
            </ul>
        </nav>
    );
}

export default Navbar;