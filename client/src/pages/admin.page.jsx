import {useState, useEffect} from 'react';
import settings from '../config/settings.json'


function AdminPage() {
    let [userThemes, setUserThemes] = useState([]);
    let [currentThemeID, setCurrentThemeID] = useState("");
    let [phrases, setPhrases] = useState([]);
    let [approve, setApprove] = useState(false);
    let [comments, setComments] = useState("");

    useEffect(() => {
     
        fetch(`${settings.serverUrl}/api/themes/admin`)
          .then((res) => res.json())
          .then((data) => {
            console.log("data is ******" + JSON.stringify(data))
            setUserThemes(data);
          })
          .catch((err) => {
            console.error(err);
            setUserThemes([]);
          });
      }, []);

      function getPhrases(id) {
        console.log("before fetch and theme id is" + id);
        setCurrentThemeID(id);
        fetch(`${settings.serverUrl}/api/responses/responsesForTheme/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ themeId: id })
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data is ******" + JSON.stringify(data))
              setPhrases(data)
            })
            .catch((err) => {
              console.error(err);
              setUserThemes([]);
            });
      }

      function updateTheme(approval) {
            let updatedType = approval ? "public" : "private";
            let reqBody = {
                id: currentThemeID,
                type: updatedType,
                comments: comments
            }
            fetch(`${settings.serverUrl}/api/themes/admin`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data is ******" + JSON.stringify(data))
                setPhrases(data)
            })
            .catch((err) => {
                console.error(err);
                setUserThemes([]);
            });
      }

    return (
        <div>
            <div className='center'>
                Admin Page
            </div>
            {userThemes.length === 0  &&
            <div>
                There are no themes that need your approval.
            </div>
            }
            {userThemes.length > 0 && 
            <div>
            <div className='admin-grid'>
                    <div className='admin-column'>
                        <div>
                            <table>
                                <tbody>
                                {userThemes.map((t) =>
                                    <tr key={t.ThemeID} value={t.ThemeID} onClick={e => getPhrases(t.ThemeID)}>
                                    <td> 
                                        {t.Name}AND {t.ThemeID}
                                    </td>
                                    <td>
                                        {t.Type}
                                    </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {phrases.length > 0 && 
                    <div className='admin-column'>
                        <div>
                            theme name
                        </div>
                        <div>
                            <table>
                                <tbody>
                                    {phrases.map((p) =>
                                        <tr key={p.ResponseID} value={p.ResponseID}>
                                            <td> 
                                                {p.Phrase}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                    }
            </div>
            
            <div className='approve-grid'>
                <div>
                    <label htmlFor="comments">Comments:</label>
                </div>  
                <div>
                    <input type='text' id='comments' name='comments' value={comments} onChange={e => setComments(e.target.value)}/>
                </div>  
                <div>
                    <button id='approve' name='approve' onClick={()=>updateTheme(true)}>Approve</button>
                </div>
                <div>
                    <button id='approve' name='approve' onClick={()=>updateTheme(false)}>Deny</button>
                </div>
                
            </div>
            </div>
            } 
        </div>

    )
}

export default AdminPage


