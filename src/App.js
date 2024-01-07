import './App.css';
import {useState} from 'react';

const KEY = "vendingMachineDrinksSavedSurveyInfo" // If anything else uses this I'd like to see it

function DrinksForm () {
    function getData () {
        const dataInStorage = localStorage.getItem(KEY);
        if ( dataInStorage ) {
            return (dataInStorage); // Check if this is empty ie. First time user
        } else {
            return JSON.stringify({
                "coke": 0,
                "pepsi": 0
            });
        }
    }
    const data = getData();
    const [dataJSON, setDataJSON] = useState(JSON.parse(data));
    // I hate this but I can't think of another way to get
    // the right scope without muts. yayy FP

    function saveFormToLocalStorage(dataToUse = 0) {
        console.log(dataToUse);
        localStorage.setItem(KEY, JSON.stringify(dataToUse));
    }

    function pressAButton ({key}) {
        // Do I actually have to pass strings around and then JSON them for a
        // second and then string them again? I hate that.
        console.log(key);
        const newDataJSON = {
            ...dataJSON,
            [key]: (dataJSON[key]) + 1
        }
        console.log(newDataJSON);
        setDataJSON(newDataJSON);
        saveFormToLocalStorage(newDataJSON);
    }
      const [drinkInputName, setDrinkInputName] = useState(''); // State for the input field                                                                                                                
                                                                                                                                                                                        
      const handleDrinkFormSubmit = (event) => {                                                                                                                                                 
        event.preventDefault();                                                                                                                                                         
        setDataJSON({ ...dataJSON, [drinkInputName]: 1 }); // Add the 'name' key to the data object                                                                                                      
      };                                                                                                                                                                                
                                                                                                                                                                                        
      const handleDrinkFormChange = (event) => {                                                                                                                                                 
        setDrinkInputName(event.target.value); // Update the 'name' state when the input changes                                                                                                  
      };                                                                                                                                                                                
                                                                                                                                                                                        
    return (
        <div>
            {Object.keys(dataJSON).map((key, index) => 
                <button key={key} onClick={() => pressAButton({key})}>
                    {key}
                </button>
            )}
            <form onSubmit={handleDrinkFormSubmit}>
                <input type="text"
                value={drinkInputName}
                onChange={handleDrinkFormChange}
                placeholder="New Drink?"/>
                <input type="submit" value="Submit" />
            </form>
            <p>{JSON.stringify(dataJSON)}</p>
        </div>
    )
}
// Unnecessary Save Button
// <button onClick={() => saveFormToLocalStorage(dataJSON)}>Save Form</button>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DrinksForm />
      </header>
    </div>
  );
}

export default App;
