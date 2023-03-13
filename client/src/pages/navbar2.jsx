import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import settings from '../config/settings.json'

import {AuthContext} from '../components/AuthContext'




function Navbar2() {
    //const {authUser} = useContext(AuthContext)
    const [themes, setThemes] = useState([]);

    //get 8 ball responses on initial load (when component mounts)
    useEffect( () => {
        fetch(`${settings.serverUrl}/api/themes/public`)
            .then((res) => res.json())
            .then((data) => setThemes(data))
            .catch((err) => {
              console.error(err);
              setThemes("Could not connect to test api endpoint :(");
            });    
        }, []);

    return (
    
        <div>
            <nav>
                <div>
                    Select a Theme 
                </div>
                <div className="nav-item">
                   
                   <select name="themes" id="themes">
                    {themes.map(t =>
                    <option key={t.ThemeID} value={t.ThemeID} selected={t.Name === 'default' ? 'true' : 'false'}>{t.Name}</option>
                    )}
                   </select> 
                </div>
                
            </nav>
        </div>
        
    );
}



export default Navbar2;