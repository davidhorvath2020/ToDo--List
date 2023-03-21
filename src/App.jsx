import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [style, setStyle] = useState("CorrectInput")

  const [newItem, setNewItem] = useState("");
  const [newTitle, setnewTitle] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []);

  const [checked, setChecked] = useState(false)
  const [search, setSearch] = useState('')
  const [unDoneSearch, setUnDoneSearch] = useState('');

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items, checked, unDoneSearch])

  function SetTheDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  } // const item = {}

  function addItem(/*item*/) {
    if (!newItem || !newTitle) {
      setStyle("Incorrectinput");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 10000),
      title: newTitle,
      value: newItem,
      checkedItem: false
    };
    // setItems((oldList) => [...oldList, item]);
    //setItems((items) => [...items, item].sort((f, t) => f.checkedItem - t.checkedItem));
    setItems((items) => [item, ...items].sort((f, t) => f.checkedItem - t.checkedItem));
    setNewItem("");
    setnewTitle("");

  }

  function deleteItem(id) {
    const newArray = items.filter((x) => x.id !== id);
    setItems(newArray);
  }

  function deleteAll() {
    setItems([])
  }

  function handleCheck(event, id) {
    setChecked(prevChecked => !prevChecked)
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].checkedItem = event.target.checked
      }
      const sortedItems = [...items].sort((f, t) => f.checkedItem - t.checkedItem)
      setItems(sortedItems)
    }
  }

  return (
    <div className={darkMode ? "App" : "App Dark"}>
      {/*******************ADDING SECTION *******************/}
      <label className="switch" >
        <span className="sun"><svg viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
        <span className="moon"><svg viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
        <input onClick={SetTheDarkMode} type="checkbox" className="input" />
        <span className="slider"></span>
      </label>
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
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className={style}
        />
        <input type='checkbox'
          onChange={(e) => setUnDoneSearch(e.target.checked)}
        /><label>csak a bejefezetlen feladatokat mutasd</label>
        <div className='AddItems--Button-Counter'>
          <button onClick={() => addItem()} className="AddItemsButton">Add</button>
          <button onClick={deleteAll} className='DeleteAllButton'>Delte all</button>
          <br />
          <span>You have {items.length} task to do</span>
        </div>
      </div>

      {/*******************ADDED SECTION *******************/}

      <div className='AddedTodo--Container'>
        {items
          .filter((x) => x.title.toLowerCase().includes(search) || x.value.toLowerCase().includes(search)
          )
          .filter((x) => x.checkedItem !== unDoneSearch || !x.checkedItem)
          .map((x) => {
            return (
              <div className='TaskDiv' key={x.id} >
                <div className='Title--Container'>
                  <label className="checkbox-btn">
                    <label type="checkbox"></label>
                    {/* <input id="checkbox" type="checkbox" onChange={(e) => console.log(e.target.checked, x.id)} /> */}
                    <input id="checkbox"
                      type="checkbox"
                      onChange={(event) => handleCheck(event, x.id)}
                      defaultChecked={x.checkedItem}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <h2>{x.title}</h2>
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(x.id)}
                  >
                    ❌
                  </button>
                </div>
                <span>{x.value}</span>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default App;

// items.filter((x) => x.title == search || x.value == search
//         ? x
//         : x.title.toLowerCase().includes(search) || x.value.toLowerCase().includes(search))
// console.log(checked)