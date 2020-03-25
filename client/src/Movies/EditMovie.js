// Component with a form to update the chosen movie
import React, { useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const EditMovie = props => {

    console.log(props, ' props in EditMovie')

    const { id } = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = ev => {
        ev.persist(); // to access the event properties in an asynchronous way
        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        })}
    
    // loop through movies to find which movie to edit, then set to state.
    useEffect(() => {
        const movieToEdit = props.movies.find(elem => `${elem.id}` === id);
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.movies, id])
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                // console.log(res, ' res')
                const editedMovieList = [...props.movies]
                editedMovieList[id] = res.data
                props.setMovies(editedMovieList)
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
                <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars[]"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        
        <button className="md-button form-button">Update</button>
      </form>
        </div>
    )   
} 

export default EditMovie