import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'

const Item = (props) => {

    const [näytetäänkö, setNäytetäänkö] = useState(false)

    const poistaTuote = (item) => {
        const result = window.confirm("Haluatko poistaa tuotteen: " + item.itemName)
        if (result === false) {
            return 
        }
        else {
            sendToBackend(item.itemId)
            .then(response => alert(response.data))

            setTimeout(() => {
                props.setHaeDatat(!props.haeDatat)
            }, 500)
            
        }
    }

    const sendToBackend = (id) => {
        return Axios.delete('https://localhost:5001/api/shoppinglist/' + id)
    }
    return (
        <div className="App">
            <h4 onClick={() => setNäytetäänkö(!näytetäänkö)}>{props.item.itemName}</h4>
           {näytetäänkö &&
           <div className="TuoteTiedot" onClick={() => setNäytetäänkö(!näytetäänkö)}>
               <h5 style={{color: 'black'}}>{props.item.pieces+" kpl "}{props.item.itemName}</h5>
                <table>
                    <thead>
                        <tr>
                            <th><i onClick={() => props.muokkaa(props.item)} className="fas fa-pencil-alt"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><i onClick={() => poistaTuote(props.item)} className="fas fa-trash-alt"></i></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                }
        </div>
      
        )

    }

export default Item