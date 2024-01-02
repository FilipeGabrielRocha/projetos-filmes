import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

const imageUrl = import.meta.env.VITE_IMG

export default function MovieCard({movie, showLink = true, showMovieTitle = true, showMovieVoteAverage=true}){
    return(
        <div className='movie-card'>
            <img src={`${imageUrl}/${movie.poster_path}`} alt={movie.title} />
            {showMovieTitle && <h2>{movie.title}</h2>}
            {showMovieVoteAverage && <p><FaStar /> {movie.vote_average.toFixed(2)} / 10</p>}
            {showLink && <Link to={`/movie/${movie.id}`} >Detalhes</Link>}
        </div>
    )
}

// imageUrl+movie.poster_path