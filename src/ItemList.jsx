import './App.css'
import React, {useState, useEffect} from 'react'
import AddItem from './AddItem'
import EditItem from './EditItem'
import Item from './Item'

const ItemList = () => {

    const [items, setItems] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [haeDatat, setHaeDatat] = useState(false)
    const [muokattavaTuote, setMuokattavaTuote] = useState({})
    const [haku, setHaku] = useState('')

    useEffect(() => {
        fetch("https://localhost:5001/api/shoppinglist")
        .then(res => res.json())
        .then(data => setItems(data))
    }, [showAddForm, haeDatat, showEditForm])

      const muokkaa = (i) => {
        setMuokattavaTuote(i)
        setShowEditForm(true)
    }
    return (
        <div className="App">
            <h2>Tuotteet</h2>          
            {showAddForm && <AddItem setShowAddForm={setShowAddForm} />}
            {!showAddForm && <button onClick={() => setShowAddForm(!showAddForm)} className="TuotteenLisäysNappi" >Lisää tuote</button>}
            <br />
            
            {showEditForm && <EditItem setShowEditForm={setShowEditForm} item={muokattavaTuote} />}
            <input className="hakuKenttä" type="text"
            value={haku} maxLength={15} onChange={({target}) => setHaku(target.value)} placeholder="Etsi tuote" />
            {items && items.map(i => {
                const lowerCaseName = i.itemName.toLowerCase()
                if (lowerCaseName.indexOf(haku.toLowerCase()) > -1) {
                    return (
               <Item item={i} muokkaa={muokkaa} setHaeDatat={setHaeDatat} haeDatat={haeDatat} />
                    )}
                    }
                ) 
            }   
            {!items && <h4>Ladataan...</h4>}
        </div>
        )
    }

export default ItemList