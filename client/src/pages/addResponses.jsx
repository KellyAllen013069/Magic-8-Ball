
import React, { useState} from "react";
import settings from "../config/settings.json";

function UserResponses() {

    const [response, setResponse] = useState("");
    const [respArray, setRespArray] = useState([]);
    const [newId, setNewId] = useState("");
      
    function onSubmit(event) {
        event.preventDefault();

        let reqBody = {
          response,
        };
  
        fetch("${settings.serverUrl}/api/addUser", {
            method: "POST", 
            headers: {
              "Content-Type" : "application/json",
          },
            body: JSON.stringify(reqBody),
        })
            .then((res) => res.json())
            .then((data) => {
              
              //console.log(data);
              setNewId(data.insertId);
              console.log(`new is ${newId}`); 
            })
            .catch((err) => console.error(err))
      };
    
    return (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="response">AddResponse:&nbsp;</label>
            <input id="response" 
                        type="text" 
                        value={response} 
                        onChange={(event) => setResponse(event.target.value)}
                        required
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>
      );
  
}

export default UserResponses;

