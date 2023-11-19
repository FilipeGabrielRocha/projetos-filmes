import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit } from 'react-icons/bs'

import MovieCard from "../../components/movieCard/MovieCard"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

export default function Movie(){
    const {id} = useParams()

    const [movie, setMovie] = useState(null)

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();

        console.log("data", data);
        
        setMovie(data);
        console.log("movie", movie.genres);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apikey}&language=pt-BR`
        getMovie(movieUrl)
    }, [])

    return(
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3><BsWallet2 /> Orçamento:</h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    <div className="info">
                        <h3><BsGraphUp /> Receita:</h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                    <div className="info">
                        <p> {movie.runtime} Min</p>
                    </div>
                    <div className="info description">
                        <h3>Sinopse:</h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    )
}