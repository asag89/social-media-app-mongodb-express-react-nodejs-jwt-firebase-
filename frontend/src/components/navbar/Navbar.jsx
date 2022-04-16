
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, resetAuth } from '../../feautures/currentUser/currentUserSlice';

import "./navbar.css"

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetAuth())
    navigate('/login')
  }

  return (
    <section className='navbar-wrapper'>
      <nav className='navbar container'>
        <Link to="/">
          <h1>Ankrom</h1>
        </Link>
        <div className='search-wrapper'>
          <label htmlFor="search" className='navbar-search-label'><SearchIcon className='navbar-SearchIcon' /></label>
          <input type="text" id="search" className="navbar-input" placeholder='Search' />
        </div>
        <div className='navbar-icon'>
          <LogoutIcon onClick={onLogout} />
        </div>
      </nav>
    </section>
  )
}
export default Navbar