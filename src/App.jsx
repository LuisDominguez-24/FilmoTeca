import './App.css'
import {MyRouts} from './Routers/router.jsx'
import {Navbar} from './components/Navbar.jsx';

export function App() {
  return (
    <div className='main-container'>
      <header className='navbar__header'>
        <Navbar />
        <h1 className='title'>Filmoteca</h1>
      </header>
    <MyRouts />
    </ div>

  )
}


