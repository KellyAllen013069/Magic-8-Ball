import { useEffect, useState, useContext, useRef } from "react";
import {MdEdit, MdDelete} from 'react-icons/md';
import settings from "../config/settings.json";
import { AuthContext } from "../components/AuthContext";

function UserThemes() {
  const [name, setName] = useState("");
  const nameRef = useRef(null);
  const [userThemes, setUserThemes] = useState([]);
  const { authUser } = useContext(AuthContext);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [themeID, setThemeID] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [makePublic, setMakePublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [method, setMethod] = useState('add');
  const [editTheme, setEditTheme] = useState("");
  const [responses, setResponses] = useState([]);
  const [phrasesToUpdate, setPhrasesToUpdate] = useState([]);
  const [additionalPhraseNum, setAdditionalPhraseNum] = useState(0);
  const [additionalPhrases, setAdditionalPhrases] = useState([]);
  const [responseData, setResponseData] = useState([]);


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

  function addTheme() {
    setErrorMessage("");

    if (name==="") {
      setErrorMessage("Please name your theme");
      nameRef.current.focus();
      return;
    }
    console.log("phrases length is " + phrases.length)
    if (phrases.length<5) {
      setErrorMessage("You must add at least 5 phrases.")
      return;
    }

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
      console.log("")
      if (data.status === 'success') {
        console.log("ARE WE EVEN GETTING HERE??????")
        const phraseReqBody = {
          themeID: data.theme.insertId,
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
            setName("");
            setPhrases(Array(20).fill(""));
            console.log("!!!!adding responses return data is " + JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function updateTheme() {
    console.log(" RESPONSE DATA IS ****************" + JSON.stringify(responseData));
  

    setErrorMessage("");
  
    if (name==="") {
      setErrorMessage("Please name your theme");
      nameRef.current.focus();
      return;
    }
  
    if (responseData.length < 5) {
      setErrorMessage("You must add at least 5 phrases.");
      return;
    }
  
    const reqBody = {
      Name: name,
      Type: makePublic ? 'publish' : 'private',
    }
  
    fetch(`${settings.serverUrl}/api/themes/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        const phrasesToUpdate = responseData.map(response => ({
          ResponseID: response.ResponseID,
          Phrase: response.Phrase.replace(/'/g, "''")
        }));
        setPhrasesToUpdate(phrasesToUpdate);
        console.log("PHRASES TO UPDATE ARE" + JSON.stringify(phrasesToUpdate))
        fetch(`${settings.serverUrl}/api/responses/updateAllResponses`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ responses: phrasesToUpdate })
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("!!!!updating responses return data is " + JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
        })
  
        if (additionalPhrases.length > 0) {
          const phraseReqBody = {
            themeID: themeID,
            phrases: additionalPhrases
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
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }
  

  function onSubmit(e) {
    console.log("IN SUBMIT");
    e.preventDefault();

    method==='edit' ? updateTheme() : addTheme()
  }

  function getEditTheme(id) {
    setMethod('edit');
    console.log("need to edit theme" + id);
    setThemeID(id);
    //get theme info
    fetch(`${settings.serverUrl}/api/themes/${id}`)
    .then(res=>res.json())
    .then(data => {
      setEditTheme(data)
      setName(data.Name);
      console.log("DATA RETURNED NAME IS  "+ JSON.stringify(data))
      //get responses for that theme
      fetch(`${settings.serverUrl}/api/responses/responsesForTheme`,{
        'method': 'POST',
        'headers': {
          'content-type': 'application/json'
        },
        body: JSON.stringify({themeId:id})
      })
      .then((res) => res.json())
      .then((data) => {
        setAdditionalPhraseNum(20-data.length);
        setResponseData(data)
      })
      .catch((err) => {
        console.error(err);
        setResponseData("");
      });    
    })
  }

  function updateToAdd() {
    setMethod('add')
  }

  function handleChange(e, responseID) {
    const newValue = e.target.value;
    setResponseData(prevState => prevState.map(response => {
      if (response.ResponseID === responseID) {
        return { ...response, Phrase: newValue };
      }
      return response;
    }));
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
                            <MdDelete value={t.ThemeID}/>
                          </td>
                          <td>
                            <MdEdit id={t.ThemeID} onClick={() => getEditTheme(t.ThemeID)}/>
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
            {method ==='edit' && (
              <div>
                <button onClick={()=>{updateToAdd()}}>Add a Theme</button>
              </div>
            )}
        </div>
        <div className="themes-grid-item add-theme" >
                      <div className="message">
                        {errorMessage}
                      </div>
                      <div className="theme-grid-item-title2">
                        {method==='edit'? `Update ` : `Add a `}Theme
                      </div>
                      <div className="theme-form center">
                            <form onSubmit={onSubmit}>
                                <div>
                                  <label htmlFor="name">Theme Name:&nbsp;</label>
                                </div>
                                <div>
                                  <input id="name"
                                    ref={nameRef}
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                  />
                                </div>
                                <div>
                                Phrases
                                </div>
                                {method === 'edit' ?
                                  <div>
                                  <div>
                                       Old responses here 
                                      {responseData.map((response) => (
                                        <div key={response.ResponseID}>
                                          <input 
                                            className="phrase-input" 
                                            type="text" 
                                            id={response.ResponseID}
                    
                                            value={response.Phrase}
                                            maxLength={80}
                                            onChange={(e) => {
                                              handleChange(e, response.ResponseID)
                                            }}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    <div>
                                      place for new responses
                                      {[...Array(additionalPhraseNum)].map((_, i) => (
                                    <div key={i}>
                                    <input className="phrase-input" type="text" 
                                        id={`phrase${i}`}
                                        value={phrases[i]}
                                        onChange={(event) => setAdditionalPhrases([...additionalPhrases.slice(0, i), event.target.value, ...additionalPhrases.slice(i+1)])} maxLength={50}/>

                                    </div>
                                  ))}
                                    </div>
                                  
                                    
                                  </div>
                                :
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
                                }
                                <div>
                                  <input type='checkbox' id='publicCheck' name='publicCheck' onChange={(e) => setMakePublic(!makePublic)}/>
                                  Public
                                </div>
                                <div className="public-info">
                                  Checking public will allow others to use your theme after approval.
                                </div>
                                <div>
                                  <button type="submit">{method==='edit' ? `Update ` : 'Add '} Theme</button>
                                </div>
                          </form>
                      </div>
          </div>
      </div>
      
  )
}

export default UserThemes;
