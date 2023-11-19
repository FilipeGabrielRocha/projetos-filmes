import MovieCard from "../../components/movieCard/MovieCard";
import "../MovieGrid.css";

import { useState, useEffect } from "react";

const moviesURL = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    
    setTopMovies(data.results);
  };
  
  useEffect(() => {
    const topRatedUrl = `${moviesURL}/top_rated?${apikey}&language=pt-BR`;
    
    getTopRatedMovies(topRatedUrl);
    console.log(topMovies);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Mais Avaliados</h2>
      <p className="title">Os filmes mais bem avaliados pela comunidade.</p>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
