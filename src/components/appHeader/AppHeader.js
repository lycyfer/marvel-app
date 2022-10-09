import './appHeader.scss';
import {Link, NavLink} from 'react-router-dom'
import {useState} from 'react'

const AppHeader = () => {

    const [char, setChar] = useState(true);
    const [comics, setComics] = useState(false)

    const onClickChar = () => {
        setChar(true)
        setComics(false)
    }

    const onClickComics = () => {
        setChar(false)
        setComics(true)
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/" onClick={onClickChar}>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink to="/" onClick={onClickChar} style={{ color: char ? '#9f0013' : 'black' }}>Characters</NavLink></li>
                    /
                    <li><NavLink onClick={onClickComics} style={{ color: comics ? '#9f0013' : 'black' }} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    ) 
}

export default AppHeader;