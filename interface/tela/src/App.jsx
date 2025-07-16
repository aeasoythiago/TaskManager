import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/global.css';
import {  Login  } from './pages/login';
import { NewUser } from './pages/signup';
import { Tasks } from './pages/task';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/newuser" element={<NewUser/>} />
        <Route path="/task" element={<Tasks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

