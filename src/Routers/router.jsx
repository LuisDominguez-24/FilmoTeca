import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from '../Pages/LandingPage.jsx';
import {MovieDetails} from '../components/MoviesDetails.jsx';
import {ContextSeriesCard} from '../components/ContextSeries.jsx';
import {SeriesDetails} from '../components/SeriesDetails.jsx';

export function MyRouts() {
    return(
            <Routes>
                <Route exact path="/" element= {<h1>Home</h1>} />
                <Route path="/movies" element={<LandingPage />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/series" element={<ContextSeriesCard />} />
                <Route path="/series/:id" element={<SeriesDetails />} />
                <Route path="/about" element={<h1>About</h1>} />
            </Routes>
    )
}