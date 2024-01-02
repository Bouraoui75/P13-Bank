import Main from './pages/main';
import Login from './pages/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Profile from './pages/profile';
import NavBar from './layout/navBar';
import Authentication from './authentication';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<Authentication />}>
            <Route element={<Profile />} path="/profile" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
