import React from 'react';
import {useState} from 'react';
import settings from "../config/settings.json";
import { useContext } from "react";
import {AuthContext} from '../components/AuthContext'
import {useNavigate} from 'react-router-dom';
import {FaGoogle, FaGithub} from 'react-icons/fa'




function MainAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMessage,setAuthMessage] = useState("");
    const {setAuthUser} = useContext(AuthContext);
    const [isUserUpdated, setIsUserUpdated] = useState(false);
    let navigate = useNavigate();

    function signinLocal(e) {
        e.preventDefault();
        setAuthMessage("");
        if (email === "") {
            setAuthMessage("Please enter your email address");
            return;
        }
        if (password ==="") {
            setAuthMessage('Please enter your password.')
            return;
        }
        const reqBody = {
            email: email,
            password: password
        };
  
  
        fetch(`${settings.serverUrl}/api/authlocal/login`, {
              method: "POST", 
              credentials: 'include',
              headers: {
                  "Content-Type" : "application/json",
                  "credentials": "include"
              },
              body: JSON.stringify(reqBody),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("success coming back is " + data.success);
            console.log("message coming back is " + data.message);
            console.log("!!!!!!!!!!!!!!!!!return data is " + JSON.stringify(data));
            console.log("!!!!!status is " + data.status)
            setAuthUser(data.user);
            //setIsUserUpdated(true);
            setAuthMessage(data.message);
            if (data.success==='true') {
                console.log("it is a success now move")
                navigate("/");
                window.location.reload();
            }
        })
        .catch((err) => {

            console.error(err);
        })

    }
   
    function signinGoogle() {
        window.open("http://localhost:5001/api/authgoogle/login", "_self")
    }
   
    function signinGitHub() {
        window.open("http://localhost:5001/api/authgithub/login", "_self")
    }

    return (
        
        <div className="login-container">

            <div className="user-form">
                <div className="message form-header">
                   {authMessage}
                </div>
                <form>
                    <div className="form-item">
                        
                        <input type="email" className="form-control" id="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-item">
                       
                        <input type="password" className="form-control" id="password" placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-button">
                        <button onClick={e => signinLocal(e)} className="btn">Login</button>
                    </div>
                </form>
            </div>
            <div className='login-sep'>
                <hr/>
            </div>
           <div className='auth-group'>
                <div className="google-btn-div" onClick={signinGoogle}>
                    <div>
                        <FaGoogle/>
                    </div>
                    <div>
                        <span>Login with Google</span>
                    </div>
                </div>
               
                <div className="gh-btn-div" onClick={signinGitHub}>
                    <div>
                       <FaGithub/>
                    </div>
                    <div>
                        <span>Login with GitHub</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainAuth