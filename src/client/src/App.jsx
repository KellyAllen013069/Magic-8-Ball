import { useState, useEffect } from "react";

function App() {
  let [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/responses")
      .then((res) => res.json())
      .then((data) => setResponses(data))
      .catch((err) => {
        console.error(err);
        setResponses("Could not connect to test api endpoint :(");
      });
  }, []);

 /*  let length = responses.length;
  let randomPhraseID =  Math.floor(Math.random() * (length-1 + 1)) +1;
  console.log("random id is " + randomPhraseID);
  let randomPhrase = responses[randomPhraseID].Phrase;
   */

  let randomPhrase = responses[Math.floor(Math.random()*responses.length)];
  return (
    <div className="App">
      <header>
        <h1>Basic Mern Starter Template</h1>
        <hr />
        <h2>{randomPhrase?.Phrase}</h2>

          <ul>
          {responses.map((response) => <li key={response.ResponseID}>{response.Phrase}</li>)}
          
        </ul> 
      </header>
    </div>
  );
}

export default App;
