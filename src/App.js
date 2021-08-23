
import './App.css';
import Home from './componnent/home';
import Favorites from './componnent/favorities';
import { useState, useEffect } from 'react';

import axios from "axios"

function App() {
  const [page, setPage] = useState(false)
  const [curcity, setcurcity] = useState('')
  const [favocities, setfavorcities] = useState([])
  const [whether, setWhether] = useState([])


  return (
    <div>
      <header>
        <h1>our whether app</h1>
        <button className="tool" onClick={() => setPage(false)}>Home</button>
        <button className="tool" onClick={() => setPage(true)}>Favorites</button>
      </header>

     
      
          {!page && <Home curcity={curcity} setcurcity={setcurcity} whether={whether} setWhether={setWhether} favocities={favocities} setfavorcities={setfavorcities}></Home>}
          {page && <Favorites curcity={curcity} setcurcity={setcurcity} page={page} setPage={setPage}  whether={whether} setWhether={setWhether} favocities={favocities} setfavorcities={setfavorcities}></Favorites>}
      
   

    </div>
  );
}

export default App;

