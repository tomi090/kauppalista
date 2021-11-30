import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'

// ItemList.jsx tulostaa tämän komponentin jokaiselle tuotteelle ja lähettää propsina aina kyseisen tuotteen tiedot
const Item = (props) => {

    // Komponentin tila joka määrää näytetäänkö pelkkä nimi vai muutkin tiedot.
    const [näytetäänkö, setNäytetäänkö] = useState(false)

    // Poistonapin tapahtumankäsittelijä
    const poistaTuote = (item) => {
        const result = window.confirm("Haluatko poistaa tuotteen: " + item.itemName)
        if (result === false) {
            return // jos ei haluta poistaa, niin hypätään pois funktiosta.
        }
        else {
            sendToBackend(item.itemId)
            .then(response => alert(response.data))

            setTimeout(() => {
                props.setHaeDatat(!props.haeDatat)
            }, 500)
            
        }
    }

    // Axios metodi joka lähettää poistopyynnön back-endiin
    const sendToBackend = (id) => {
        return Axios.delete('https://localhost:5001/api/shoppinglist/' + id)
    }



    return (
        <div className="App">

            {/* <h4 onMouseEnter={() => setNäytetäänkö(!näytetäänkö)} onMouseLeave={() => setNäytetäänkö(!näytetäänkö)}>{props.peli.nimi}</h4>
            */ }

            <h4 onClick={() => setNäytetäänkö(!näytetäänkö)}>{props.item.itemName}</h4>

           {näytetäänkö &&
           <div className="TuoteTiedot" onClick={() => setNäytetäänkö(!näytetäänkö)}>

               <h5 style={{color: 'black'}}>{props.item.pieces+" kpl "}{props.item.itemName}</h5>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><i onClick={() => props.muokkaa(props.item)} className="fas fa-pencil-alt"></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>

                            <td><i onClick={() => poistaTuote(props.item)} className="fas fa-trash-alt"></i></td>
                            <td></td>
                        </tr>
                    </tbody>
                    
                </table>
                </div>
                }
        </div>
      
        )

    }

export default Item