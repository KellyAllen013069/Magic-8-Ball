
import { useContext, useState, useEffect } from "react";
import settings from "../config/settings.json";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AuthContext } from "../components/AuthContext";
import AdminNav from "./adminNav";


function DefaultPage() {
    let [themes, setThemes] = useState([]);
    //responses holds all possible responses for 8 ball fortune
    let [responses, setResponses] = useState([]);
    //random phrase will be the random one response from the response object array
    //set initially to empty string
    let [randomPhrase, setRandomPhrase] = useState("");
    let {authUser} = useContext(AuthContext)
    let [isLoading, setIsLoading] = useState(true)

    const {
      transcript,
      listening,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();


    function getAlThemes() {
      fetch(`${settings.serverUrl}/api/themes/public`)
            .then((res) => res.json())
            .then((data) => {
              setThemes(data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setThemes("");
            });    
    }

    function getDefaultResponses() {
      fetch(`${settings.serverUrl}/api/responses/default`)
          .then((res) => res.json())
          .then((data) => setResponses(data))
          .catch((err) => {
            console.error(err);
            setResponses("");
          });    
    }

    function updateResponses(themeId) {
      console.log("themeID IS " + themeId)
      fetch(`${settings.serverUrl}/api/responses/${themeId}`)
      .then((res) => res.json())
          .then((data) => setResponses(data))
          .catch((err) => {
            console.error(err);
            setResponses("");
          });    
    }

    function shake(){
      let ball= document.getElementById("ball")
      //css animation
      ball.classList.add("shake");
      //remove shake class
      setTimeout(function(){ ball.classList.remove("shake"); }, 1500);
    }

    function listen() {
      setRandomPhrase("");
      SpeechRecognition.startListening();
    }

    //update fortune(random phrase) on an event
    function updatePhrase() {
      SpeechRecognition.stopListening();
        setRandomPhrase("");
        shake();
        setTimeout(() => {

          if (transcript.toLowerCase().includes("javascript")) {
            setRandomPhrase("JAVASCRIPT RULES!!!")
          }else {
            console.log("responses is " + responses);
            console.log("response length is " + responses.length);
            let random = responses[Math.floor(Math.random()*responses.length)];
            console.log("random is " + random)
            setRandomPhrase(`${random.Phrase}`);
          
          }
        }, 1500);  
    };

    //get 8 ball responses on initial load (when component mounts)
    useEffect( () => {
      console.log("did mount");
      getAlThemes();
      getDefaultResponses();
    },[]);
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }

  return (
    <>
      {isLoading ? (
        <>
          Loading...
        </>
      ) : (
        <div className="main-page-flex center">
          {authUser && authUser.role === 'admin' && <AdminNav />}
          {authUser.role}
  
          <div className="main-page-flex">
            <div className="fortune-header">
              <div>
                Role is {authUser.role}
                Select a Theme
              </div>
              <div>
                <select name="themes" id="themes" onChange={(e) => updateResponses(e.target.value)} defaultValue="default">
                  {!isLoading &&
                    themes.map((t) => (
                      <option key={t.ThemeID} value={t.ThemeID}>
                        {t.Name}
                        {authUser && t.UserID === authUser.id ? "*" : ""}
                      </option>
                    ))}
                </select>
              </div>
            </div>
  
            <div className="mainpage-sep center">
              <hr />
            </div>
          </div>
  
          <div>
            <div className="wrapper">
              <div>
                <div className="main-image">
                  <img className="ball" id="ball" alt="Magic 8 Ball" src="./images/8ball.png" />
                </div>
              </div>
              <div className="fortune-containers">
                <div>
                  <p>Microphone: {listening ? "on" : "off"}</p>
                </div>
                <div>
                  <button id="btnAsk" onClick={listen}>
                    Ask Me Anything
                  </button>
                </div>
                <div>
                  <p>{transcript}? </p>
                </div>
                <div>
                  <button id="btnFortune" onClick={updatePhrase}>
                    Get Fortune
                  </button>
                </div>
                <div>
                  <p id="fortuneDisplay" className="fortune">
                    {randomPhrase}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

export default DefaultPage;

