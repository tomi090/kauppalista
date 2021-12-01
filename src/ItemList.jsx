import './App.css'
import React, {useState, useEffect} from 'react'
import AddItem from './AddItem'
import EditItem from './EditItem'
import Item from './Item'

const ItemList = () => {

    // Komponentin tila
    const [items, setItems] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [haeDatat, setHaeDatat] = useState(false)
    const [muokattavaTuote, setMuokattavaTuote] = useState({}) // Alustus tyhjä olio
    const [haku, setHaku] = useState('')

    // useEffect hookilla voidaan vaikka hakea datat alussa
    useEffect(() => {
        fetch("https://localhost:5001/api/shoppinglist")
        .then(res => res.json()) // muutetaan json data javascriptiksi
        .then(data => setItems(data)) // Asetetaan data peli nimiseen stateen
    }, [showAddForm, haeDatat, showEditForm])


      // Muokkausnapin / kynäkuvan tapahtumankäsittelijä. i = item mikä lähetetään parametrina kynäkuvakkeelta
      const muokkaa = (i) => {
        setMuokattavaTuote(i)
        setShowEditForm(true) // Muokkausikkuna tuodaan näkyviin tällä tilamuutoksella
    }


    return (
        <div className="App">
            <h2>Tuotteet</h2>
            
            {showAddForm && <AddItem setShowAddForm={setShowAddForm} />}

            {!showAddForm && <button onClick={() => setShowAddForm(!showAddForm)} className="TuotteenLisäysNappi" >Lisää tuote</button>}
            <br />
            

            {showEditForm && <EditItem setShowEditForm={setShowEditForm} item={muokattavaTuote} />}

            <input className="hakuKenttä" type="text"
            value={haku} onChange={({target}) => setHaku(target.value)} placeholder="Etsi tuote" />

            {items && items.map(i => {
                const lowerCaseName = i.itemName.toLowerCase()
                if (lowerCaseName.indexOf(haku.toLowerCase()) > -1) {
                    return (
               <Item item={i} muokkaa={muokkaa} setHaeDatat={setHaeDatat} haeDatat={haeDatat} />
            
                    )}
                    }
                ) 
            }
            
            {!items && <h4>Ldataan...</h4>}
        </div>
        )

    }

export default ItemList