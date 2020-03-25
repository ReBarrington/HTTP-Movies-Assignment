// Component with a form to update the chosen movie
import React, { useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ['']
}

const EditMovie = props => {
    const { id } = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = e => {
        e.persist(); // to access the event properties in an asynchronous way
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })}
    
    // loop through movies to find which movie to edit, then set to state.
    useEffect(() => {
        const movieToEdit = props.movies.find(e => `${e.id}` === id);
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
        }, [props.movies, id])
    
    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
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
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.description}
        />
        
        <button className="md-button form-button">Update</button>
      </form>
        </div>
    )   
} 

export default EditMovie