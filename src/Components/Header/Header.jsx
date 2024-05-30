import React from 'react'
import logo from '../netflix-94.png'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'

function Header() {
  return (
    <nav className="header">
        <img src={logo} alt="" />

        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recent">Reacently Added</Link>
            <Link to="/mylist">My List</Link>
        </div>

        <ImSearch />
    </nav>
  )
}

export default Header