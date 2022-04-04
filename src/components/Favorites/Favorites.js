import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: '',
        id: ''
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    createList = () => {
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                movies: this.props.favorites.map( m => m.imdbID )
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ id: data.id })
            });
    }



    render() { 
        const { title } = this.state;
        return (
            <div className="favorites">
                <form>
                    <input 
                        value={title}
                        onChange={this.changeTitle}
                        type='text'
                        className="favorites__name"
                        placeholder="Новый список"
                    />
                </form>
                <ul className="favorites__list">
                    {this.props.favorites.map((item) => {

                        return <li key={item.imdbID}>
                                    {item.Title} ({item.Year})
                                        <button type='button' onClick={() => this.props.deleteFav(item)}>X</button>                                  
                                </li>;
                    })}
                </ul>
                {this.state.id ? (
                    <Link to={`/list/${this.state.id}`}>Go see the list</Link>
                ) : (
                    <button disabled={!this.state.title || this.props.favorites.length === 0} type="button" className="favorites__save" onClick={ this.createList }>Сохранить список</button>
                )}
                
            </div>
        );
    }
}
 
export default Favorites;