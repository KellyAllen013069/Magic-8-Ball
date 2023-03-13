import { useContext } from "react";
import { Link } from "react-router-dom";

import {AuthContext} from '../components/AuthContext'




function Navbar() {
    const {authUser, logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout();
    }
    return (
    
        <div className="navbar-container">
            <nav>
                <div className="nav-title">
                    <Link className = "r-link" to="/">Magic 8 Ball</Link>
                </div>
                
                {authUser ? (
                <div className="nav-display">
                    <div className="nav-item">
                        <Link className = "r-link" to="/userThemes">Your Themes</Link>
                    </div>
                    {authUser.Role === 'admin' &&
                    <div className="nav-item">
                        <Link className = "r-link" to="/admin">Admin</Link>
                    </div>
                    }
                    <div className="nav-item">
                        <Link className = "r-link" onClick={handleLogout}>Logout</Link>
                    </div>
                    <div className="nav-item user-display">
                        <div>
                        {authUser.thumbnail !== "" && 
                            <img className="avatar-image" src={authUser.thumbnail} alt='User Avatar' />
                        }
                        </div>
                        <div>
                            {authUser.Name}
                        </div>
                    </div>
                </div>
                ): (
                <div className="nav-display">
                    <div className="nav-item">
                        <i>Create your own...</i>
                    </div>
                    <div className="nav-item">
                        <Link className = "r-link" to="/register">Register</Link>
                    </div>
                    <div className="nav-item">
                        <Link className = "r-link" to="/login">Login</Link>
                    </div>
                </div>
                )}
                
            </nav>
        </div>
        
    );
}



export default Navbar;