
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { register } from "../../feautures/currentUser/currentUserSlice"
import CircularProgress from '@mui/material/CircularProgress';

import Footer from "../../components/footer/Footer"
import registerImg from "../../assets/entry.jpg"
import "./register.css"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const { username, email, password } = registerUser

  const { user, isSuccess, isLoading, isError } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/")
    }
  }, [user, isSuccess, navigate])

  const handleChange = (e) => {
    setRegisterUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      username,
      email,
      password
    }
    dispatch(register(user))

    setTimeout(() => {
      if (!isLoading && isError) {
        navigate("/")
      }
    }, [2000]);
  }

  return (
    <section className="register-container">
      <div className="register">
        <img src={registerImg} className="register-img" alt="register-img" />
        <div className="register-form-contanier">
          <div className="register-form">
            <h1>Ankrom</h1>
            <p className="register-top-msg">Sign up to see your friends' photos and videos.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-grp">
                <input type="text" name="username" value={username} onChange={handleChange} autoComplete="off" required />
                <label>Username</label>
              </div>
              <div className="input-grp">
                <input type="text" name="email" value={email} onChange={handleChange} autoComplete="off" required />
                <label>Email</label>
              </div>
              <div className="input-grp">
                <input type="password" name="password" value={password} onChange={handleChange} autoComplete="off" required />
                <label>Password</label>
              </div>
              <button type="submit" className="register-submit" disabled={!username || !email || !password}>{isLoading ? <CircularProgress size={16} color="inherit" /> : "Register"}</button>
            </form>
            <p className="register-agree-terms">By signing up, you agree to the Terms.</p>
          </div>
          <div className="register-to-login-page">
            <p>Do you have an account? <Link to="/login"><span>Login</span></Link></p>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </section>
  )
}

export default Register