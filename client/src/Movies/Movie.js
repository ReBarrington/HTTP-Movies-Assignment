import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  console.log(props, ' props in Movie')

  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const routeToEditMovie = e => {
    e.preventDefault();
    props.history.push(`/update-movie/${movie.id}`)
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        const newMovieList = [];
        props.movies.map(movie => {
          if (movie.id !== res.data) {
            newMovieList.push(movie);
          }
        })
        props.setMovies(newMovieList);
      })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <button onClick={routeToEditMovie}>Edit Movie</button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button className="md-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
