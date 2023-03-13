

import settings from "../config/settings.json";


function Logout() {
 

      fetch(`${settings.serverUrl}/api/auth/google/logout`)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
         
      })
      .catch((err) => {
          console.error(err);
      })

  return (
  
    
    <div className="card">
        <div className="card-body">
            
            <div className="user-form">
                <div className="message form-header">
                   You have been logged out
                </div>
                
            </div>
        </div>
    </div>


  );
}

export default Logout;