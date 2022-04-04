import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {

    state = {
        movies: [],
        favorites: []
    }
    
    loadList = async (query) => {
        const response = await fetch (
            `http://www.omdbapi.com/?s=${query}&apikey=d1b7a5cd`
        );
        const apis = await response.json()
        this.setState({ movies: apis.Search})
    };

    addFilmToFavorites = (item) => {

        const newFavorites = [...this.state.favorites];
        let isNew = true;
        newFavorites.forEach((favorite) => {
            if (favorite.imdbID === item.imdbID) {
                isNew = false;
            }
        })
        if (isNew) {
            newFavorites.push(item)
        }
        this.setState({ favorites: newFavorites })
    }

    deleteFavorite = (favorite) => {
        const afterDeleteFavorites = this.state.favorites.filter((m) => {
            return m.imdbID !== favorite.imdbID
        })
        this.setState({ favorites: afterDeleteFavorites})
    } 

    render() { 
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox handler={this.loadList}/>
                        </div>
                        <div className="main-page__movies">
                            <Movies movies={this.state.movies} addTo={this.addFilmToFavorites}/>
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites favorites={this.state.favorites} deleteFav={this.deleteFavorite}/>
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;