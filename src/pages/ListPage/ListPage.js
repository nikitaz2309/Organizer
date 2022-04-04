import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    
    state = {
        title: '',
        movies: []
    }

    loadMovieById = async (id) => {
        const response = await fetch (
            `http://www.omdbapi.com/?i=${id}&apikey=d1b7a5cd`
        );
        const movie = await response.json()
        return movie;
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                title: data.title,
            })

            const moviesPromises = data.movies.map((movieId) => {
                return this.loadMovieById(movieId)
            })

            return Promise.all(moviesPromises)
        }).then((movies) => {
            console.log(movies)
            this.setState({ movies: movies })
        })
        // TODO: запрос к серверу на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;