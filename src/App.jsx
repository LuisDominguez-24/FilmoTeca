import './App.css'
import {MyRouts} from './Routers/router.jsx'
import {Navbar} from './components/ui/Navbar.jsx';
import { Footer } from '../src/components/ui/Footer.jsx';

export function App() {
  return (
    <div className='main-container'>
      <header className='navbar__header'>
        <Navbar />
      </header>
      <div className="content-center">
        <MyRouts />
      </div>
      <Footer />
    </div>

  )
}


