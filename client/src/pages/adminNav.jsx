import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import settings from '../config/settings.json'

import {AuthContext} from '../components/AuthContext'




function AdminNav() {
    const {authUser} = useContext(AuthContext);
    const [count,setCount] = useState("");

    useEffect(() => {
        fetch(`${settings.serverUrl}/themes/admin`)
        .then(res => res.json())
        .then((data) => {
            setCount(data.length);
        })
        .catch((err) => {
            console.log(err)
        })

    },[[]])

    return (
    
        <div className="admin-nav-container">
            <div>
                There are {count} themes to review.
            </div>
            <div> 
                <Link className = "r-link" to="/adminReview">Review Now</Link>
            </div>
        </div>
               
    );
}

export default AdminNav