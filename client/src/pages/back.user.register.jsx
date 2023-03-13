import React, { useEffect, useState} from "react";

import settings from "../config/settings.json";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");
  const [err,setErr] = useState(null);
  
 

  function onSubmit(event) {
      event.preventDefault();

      const reqBody = {
          name,
          email,
          password
      };


      fetch(`${settings.serverUrl}/api/user`, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(reqBody),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          setName("");
          setEmail("");
          setPassword("");
          setErr(null);
      })
      .catch((err) => {
          console.error(err);
          setErr(err);
      })
    };

  return (
  
    
    <div className="card">
        <div className="card-body">
            
            <div className="user-form">
                <div className="message form-header">
                   
                </div>
                <form>
                    <div className="form-item">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="test" className="form-control" id="username" onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-button">
                        <button onClick={e => onSubmit(e)} className="btn">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


  );
}

export default Register;