import {useState, useEffect} from 'react';
import {get} from '../../Data/httpClient.jsx';
import {SeriesCard} from './SeriesCard.jsx';

export function ContextSeriesCard(){
    const [series, setSeries] = useState([]);
    useEffect(()=>{
        get("/discover/tv").then((data)=>{
            setSeries(data.results)
        })
    }, [])

    return(
        <ul className='movie-list'>
            {series.map((serie)=>(
                <SeriesCard serie={serie}/>
            ))}
        </ul>
    )
}