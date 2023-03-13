import { useEffect, useState, useContext } from "react";
import {MdEdit, MdDelete} from 'react-icons/md';
import settings from "../config/settings.json";
import { AuthContext } from "../components/AuthContext";

function UserThemes() {
  const [name, setName] = useState("");
  const [userThemes, setUserThemes] = useState([]);
  const { authUser } = useContext(AuthContext);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [themeID, setThemeID] = useState("");
  const [phrases, setPhrases] = useState([]);
  const [makePublic, setMakePublic] = useState(false);

  useEffect(() => {
    if(!authUser) return;
    console.log("authuser is *******" + JSON.stringify(authUser))
    fetch(`${settings.serverUrl}/api/themes/userThemes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: authUser.id })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ******" + JSON.stringify(data))
        setUserThemes(data)
      })
      .catch((err) => {
        console.error(err);
        setUserThemes([]);
      });
  }, [authUser, shouldUpdate]);

  function onSubmit(e) {
    console.log("IN SUBMIT");
    e.preventDefault();

    const reqBody = {
      UserId: authUser.id,
      Name: name,
      Type: makePublic ? 'publish' : 'private',
    }

   

    fetch(`${settings.serverUrl}/api/themes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("!!!!adding theme return data is " + JSON.stringify(data));
      setName("");
      setThemeID(data.insertId)
      setShouldUpdate(!shouldUpdate); // Set shouldUpdate to trigger useEffect re-fetch
    })
    .catch((err) => {
      console.error(err);
    })

    const phraseReqBody = {
      themeID: themeID,
      phrases: phrases 
    }

    fetch(`${settings.serverUrl}/api/responses/addAllResponses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phraseReqBody)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("!!!!adding responses return data is " + JSON.stringify(data));
    })
    .catch((err) => {
      console.error(err);
    })
    

  }

  return (
    <div className="theme-grid">
      <div className="themes-grid-item current-themes">
            <div className="theme-grid-item-title">
              Current Themes
            </div>
            <div>
              {userThemes && userThemes.length > 0 ? (
                <table className="themes-table">
                  <tbody>
                    {userThemes.map((t) =>
                        <tr key={t.ThemeID} value={t.ThemeID}>
                          
                          <td>
                            <MdDelete/>
                          </td>
                          <td>
                            <MdEdit/>
                          </td>
                          <td>
                            {t.Name}
                          </td>
                          <td>
                            {t.Type}
                          </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <>
                  You have no currently added themes.
                </>
              )}
            </div>
        </div>
        <div className="themes-grid-item add-theme" >
                      <div className="theme-grid-item-title2">
                        Add a Theme
                      </div>
                      <div className="theme-form center">
                            <form onSubmit={onSubmit}>
                                <div>
                                  <label htmlFor="name">Theme Name:&nbsp;</label>
                                </div>
                                <div>
                                  <input id="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                
                                  />
                                </div>
                                <div>
                                Responses
                                </div>
                                <div>
                                  {[...Array(20)].map((_, i) => (
                                    <div key={i}>
                                    <input className="phrase-input" type="text" 
                                        id={`phrase${i}`}
                                        value={phrases[i]}
                                        onChange={(event) => setPhrases([...phrases.slice(0, i), event.target.value, ...phrases.slice(i+1)])} maxLength={50}/>

                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <input type='checkbox' id='publicCheck' name='publicCheck' onChange={(e) => setMakePublic(!makePublic)}/>
                                  Public
                                </div>
                                <div>
                                  Checking public will allow others to use your theme after approval.
                                </div>
                                <div>
                                  <button type="submit">Add Theme</button>
                                </div>
                          </form>
                      </div>
          </div>
      </div>
      
  )
}

export default UserThemes;
