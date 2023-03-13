
import { useNavigate } from "react-router-dom";

function Home(props) {
    let navigate = useNavigate();
    
    function gotoSignIn() {
      navigate("/user");
    }

    function gotoMain() {
      navigate("/main");
    }

  return (
      <div className="App; center">
        <h2>MAGIC 8 BALL</h2>
        
        <hr/>
          <div className="wrapper">
                <div>
                  <img id="ball" alt="Magic 8 Ball" src="/images/discoball.png"/>
                </div>
                <div>
                  <button id="btnSignIn" onClick={gotoSignIn}>Sign In</button>
                  <p>OR...</p>
                  <button id="btnDefault" onClick={gotoMain}>Use Default</button>
                </div>
          </div>
      </div>
    );
}

export default Home;

