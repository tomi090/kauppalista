import './App.css'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'

const AddItem = (props) => {

    const [itemName, setitemName] = useState('')
    const [pieces, setPieces] = useState('')

    const tyhjennä = () => {
        setitemName('')
        setPieces('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newItem = {
            itemName: itemName,
            pieces: parseInt(pieces),
        }
        
        sendToBackend(newItem)
        .then(response => {
            if (response.status === 200) {
            alert(response.data)
            props.setShowAddForm(false)
        }})

    }

    const sendToBackend = (uusiTuote) => {
        return Axios.post('https://localhost:5001/api/shoppinglist', uusiTuote)
    }
   
    return (
        <div className="App">

        <form onSubmit={handleSubmit} style={{width: '13%', margin: 'auto'}}>

            <input type="text" value={itemName} onChange={({target}) => setitemName(target.value)} placeholder="Tuotteen nimi" />
            <input type="text" value={pieces} onChange={({target}) => setPieces(target.value)} placeholder="kpl" />
           
            <input type="submit" value="Tallenna" />
            <input type="button" value="Tyhjennä" onClick={() => tyhjennä()} />
            <input type="button" value="Takaisin" onClick={() => props.setShowAddForm(false)} />
            
        </form>

    </div>
    )

}

export default AddItem