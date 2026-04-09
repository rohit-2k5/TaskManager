import './App.css'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import Tasks from './src/pages/Tasks';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Tasks/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
