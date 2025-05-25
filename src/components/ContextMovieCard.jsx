import {useState, useEffect} from 'react';
import {get} from '../Data/httpClient.jsx';
import {MovieCard} from './MovieCard.jsx';
import '../Styles/MovieCard.css';

export function ContextMovieCard(){
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        get("/discover/movie").then((data)=>{
            setMovies(data.results)
        })
    }, [])

    return(
        <ul className='movie-list'>
            {movies.map((movie)=>(
                <MovieCard movie={movie}/>

            ))}
        </ul>
    )
}