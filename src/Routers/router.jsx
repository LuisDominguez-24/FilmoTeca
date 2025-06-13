import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from '../Pages/LandingPage.jsx';
import {MovieDetails} from '../components/movies/MoviesDetails.jsx';
import {ContextSeriesCard} from '../components/series/ContextSeries.jsx';
import {SeriesDetails} from '../components/series/SeriesDetails.jsx';
import { Home } from '../components/home/Mainpage.jsx';

export function MyRouts() {
    return(
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/movies" element={<LandingPage />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/series" element={<ContextSeriesCard />} />
                <Route path="/series/:id" element={<SeriesDetails />} />
                <Route path="/about" element={<h1>About</h1>} />
            </Routes>
    )
}