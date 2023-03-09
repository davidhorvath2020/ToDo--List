import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const item = {}
  const [darkMode, setDarkMode] = useState(false);

  const [newItem, setNewItem] = useState("");
  const [newTitle, setnewTitle] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []);

  const [style, setStyle] = useState("CorrectInput")
  const [checked, setChecked] = useState(false)


  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])


  function SetTheDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }



  function addItem(item) {
    if (!newItem || !newTitle) {
      setStyle("Incorrectinput");
      return;
    }

    item = {
      id: Math.floor(Math.random() * 1000),
      title: newTitle,
      value: newItem,
      checked: false
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
    setnewTitle("");
    console.log(item)
  }

  function deleteItem(id) {
    const newArray = items.filter((x) => x.id !== id);
    setItems(newArray);
  }

  function deleteAll() {
    setItems([])
  }

  const handleCheckBox = (e) => {
    console.log(e.target.checked)
  }


  return (
    <div className={darkMode ? "App" : "App Dark"}>
      <button className='DarkModeButton'
        onClick={SetTheDarkMode}>
        {darkMode ? "Dark" : "Light"}
      </button>
      <div className='Todo--Container'>
        <h1>THINGS TO DO</h1>
        <h1>Add a new item to do</h1>
        <input
          type="text"
          placeholder='Add a title'
          value={newTitle}
          onChange={(e) => { setnewTitle(e.target.value); setStyle("CorrectInput") }}
          className={style}
        />
        <input
          type="text"
          placeholder="Add an items..."
          value={newItem}
          onChange={(e) => { setNewItem(e.target.value); setStyle("CorrectInput") }}
          className={style}
        />
        <div className='AddItems--Button-Counter'>
          <button onClick={() => addItem()} className="AddItemsButton">Add</button>
          <button onClick={deleteAll} className='DeleteAllButton'>Delte all</button>
          <br />
          <span>You have {items.length} task to do</span>
        </div>
      </div>

      <div className='AddedTodo--Container'>
        {items.map((x) => {
          return (
            <div className='TaskDiv' key={x.id} >
              <div className='Title--Container'>
                <input type="checkbox"
                  name='checkbox'
                  onChange={handleCheckBox}
                />
                <h2>{x.title}</h2>
                <button
                  className="delete-button"
                  onClick={() => deleteItem(x.id)}
                >
                  ❌
                </button>
              </div>
              <span>{x.value}</span>
              <div> checked: {x.checked}</div>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default App;