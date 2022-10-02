import { Component } from 'react';

import './charList.scss';


import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.marvelServices
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    clickLoadMore = () =>{
        let count = 9;
        count += 9;
        this.marvelServices.
        getAllCharacters(count)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onCharLoaded = (charList) => {
        this.setState({ charList, loading: false })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    renderItems(arr) {
        const items = arr.map(item =>  {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render() {
        const {charList, loading, error} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                onClick={this.clickLoadMore}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;