import { useEffect, useState, useContext} from "react";
import settings from "../config/settings.json";
import { AuthContext } from "../components/AuthContext";

function UserThemes() {
  let [name, setName] = useState("");
  let [userThemes, setUserThemes] = useState([]);
  let {authUser} = useContext(AuthContext);


  useEffect( () => {
    console.log("authuser is *******" + JSON.stringify(authUser))
      fetch(`${settings.serverUrl}/api/themes/userThemes/`, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({id: authUser.id})
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ******" + data)
        setUserThemes(data)
      })
      .catch((err) => {
        console.error(err);
        setUserThemes("");
      });   
  }, [authUser]);
  
  function onSubmit(e) {
      console.log("IN SUBMIT");
      e.preventDefault();

      const reqBody = {
        UserId : authUser.id,
        Name : name,
        Type: 'private'
      }

      fetch(`http://localhost:5001/api/themes/`, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(reqBody)
      })
      .then((res) => res.json())
      .then((data) => {
        let newTheme = data
        setUserThemes([...userThemes, newTheme])
        console.log("!!!!adding theme return data is " + JSON.stringify(data));
      })
      .catch((err) => {
          console.error(err);
        })
    }

    return (
      <div>
      <div className="current-themes">
        <div>
          Current Themes:
        </div>
        <div>
          {userThemes != "" ?
          (
          <ul>
          {userThemes.map((t) =>
            <li key={t.ThemeId} value={t.ThemeId}>{t.Name}</li>
          )}
          </ul>
          ): (
          <>
            You have no currently added themes.
          </>
          )}
        </div>
      </div>
        <div>
          <form onSubmit={onSubmit}>
          <div></div>
            <div>
              <label htmlFor="name">Theme Name:&nbsp;</label>
              <input id="name" 
                          type="text" 
                          value={name} 
                          onChange={(event) => setName(event.target.value)}
                          required
              />
            </div>
            
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
}

export default UserThemes