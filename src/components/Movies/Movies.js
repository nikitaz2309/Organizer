import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {

    render() { 
        console.log(this.props.movies);
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem Poster={movie.Poster} title={movie.Title} Year={movie.Year} onClick={() => this.props.addTo(movie)} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;