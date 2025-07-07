import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from '../Pages/LandingPage.jsx';
import {MovieDetails} from '../components/movies/MoviesDetails.jsx';
import {ContextSeriesCard} from '../components/series/ContextSeries.jsx';
import {SeriesDetails} from '../components/series/SeriesDetails.jsx';
import { Home } from '../components/home/Mainpage.jsx';
import { Register } from '../components/Usuario/Register.jsx';
import { User } from '../components/Usuario/Perfil.jsx';
import { Login } from '../components/Usuario/Login.jsx';

export function MyRouts() {
    return(
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/movies" element={<LandingPage />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/series" element={<ContextSeriesCard />} />
                <Route path="/series/:id" element={<SeriesDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/about" element={<h1>About</h1>} />
            </Routes>
    )
}