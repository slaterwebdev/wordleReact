import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';
import gettingDocs from './firebase';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    //Aquiring game data from firebase database 
    gettingDocs
    .then(snapshot => {
      let documents = [];
      snapshot.docs.forEach(doc => {
        documents.push(doc.data());
      })
      return documents;
    }).then(docs => {
      setSolution(docs[Math.floor(Math.random() * docs.length)].word);
    });
    
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App