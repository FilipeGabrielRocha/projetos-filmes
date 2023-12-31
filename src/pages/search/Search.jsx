import "../MovieGrid.css";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../../components/movieCard/MovieCard";

const searchUrl = import.meta.env.VITE_SEARCH;
const apikey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    console.log("ah URL", url);
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);

  };

  useEffect(() => {
    const searchWithQueryURL = `${searchUrl}?${apikey}&query=${query}&language=pt-BR`;

    getSearchMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
