import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'

const EditItem = (props) => {

    const [itemName, setitemName] = useState(props.item.itemName)
    const [pieces, setpieces] = useState(props.item.pieces)

    const resetoi = () => {
        setitemName('')
        setpieces('')
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedTuote = {
            itemName: itemName,
            pieces: parseInt(pieces),
        }
        const id = props.item.itemId

        sendToBackend(id, updatedTuote)
        .then(response => {
            if (response.status === 200) {
            alert(response.data)
            props.setShowEditForm(false)
        }})
    }
    const sendToBackend = (id, updatedTuote) => {
      return Axios.put('https://localhost:5001/api/shoppinglist/' + id, updatedTuote)
    }  
    return (
        <div className="App">
            <h2>Muokkaa tuotetta</h2>
            <form onSubmit={handleSubmit} style={{width: '13%', margin: 'auto'}}>
                <input type="text" value={itemName} pattern='^[a-zA-Z ]*$' minLength={3} maxLength={15} onChange={({target}) => setitemName(target.value)} placeholder="Tuote" />
                <input type="number" value={pieces} max={999} onChange={({target}) => setpieces(target.valueAsNumber)} placeholder="kpl" />
                <input type="submit" value="Tallenna" />
                <input type="button" value="Resetoi" onClick={() => resetoi()} />
                <input type="button" value="Takaisin" onClick={() => props.setShowEditForm(false)} />               
            </form>
        </div>
        )
    }

export default EditItem