import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'

const EditItem = (props) => {


    const [itemName, setitemName] = useState(props.item.itemName)
    const [pieces, setPieces] = useState(props.item.pieces)

    const resetoi = () => {
        setitemName('')
        setPieces('')
    }
    // funktio joka ajetaan kun formi submitoidaan
    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedTuote = {
            itemName: itemName,
            pieces: parseInt(pieces),
        }

        const id = props.item.itemId
        
        // Kutsutaan funktiota, joka tekee http pyynnön
        sendToBackend(id, updatedTuote)
        .then(response => {
            if (response.status === 200) {
            alert(response.data)
            // Muokkauslomake piilotetaan propsina saadulla funktiolla joka muuttaa PelitList.jsx:ssä
            // määritettyä statea: showEditForm
            props.setShowEditForm(false)
        }})

    }

    // Tämä funktio tekee pelkän http pyyntö osuuden
    const sendToBackend = (id, muokattuTuote) => {
      return Axios.put('https://localhost:5001/api/shoppinglist/' + id, muokattuTuote)

    }  
    return (
        <div className="App">
            <h2>Tuotteen muokkaaminen</h2>

            <form onSubmit={handleSubmit} style={{width: '13%', margin: 'auto'}}>
            <p>Item ID: {props.item.itemId}</p>
                <input type="text" value={itemName} onChange={({target}) => setitemName(target.value)} placeholder="Tuote" />
                <input type="number" value={pieces} onChange={({target}) => setPieces(target.value)} />

                <input type="submit" value="Tallenna" />
                <input type="button" value="Resetoi" onClick={() => resetoi()} />
                <input type="button" value="Takaisin" onClick={() => props.setShowEditForm(false)} />
                
            </form>

        </div>
        )

    }

export default EditItem