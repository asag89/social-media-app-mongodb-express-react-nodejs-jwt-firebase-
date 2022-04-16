
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { login } from "../../feautures/currentUser/currentUserSlice"
import CircularProgress from '@mui/material/CircularProgress';

import Footer from "../../components/footer/Footer"
import loginImg from "../../assets/entry.jpg"
import "./login.css"

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = loginUser

  const { user, isSuccess, isLoading, isError } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if ((user || isSuccess) && (!isError)) {
      navigate("/")
    }
  }, [user, isSuccess, isError, navigate])

  const handleChange = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(login(loginUser))
    setTimeout(() => {
      if ( user && !isLoading && !isError) {
        navigate("/")
      }
    }, [2000]);
  }
  return (
    <section className="login">
      <div className="login-t">
        <img src={loginImg} className="login-img" alt="" />
        <div className="login-r">
          <div className="login-form">
            <h1>Ankrom</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-grp">
                <input type="text" name="email" value={email} onChange={handleChange} autoComplete="off" required />
                <label>Email</label>
              </div>
              <div className="input-grp">
                <input type="password" name="password" value={password} onChange={handleChange} autoComplete="off" required />
                <label>Password</label>
              </div>
              <button type="submit" className="login-submit" disabled={!email || !password}>{isLoading ? <CircularProgress size={16} color="inherit" /> : "Login"}</button>
            </form>
            <p ><span className="login-forget">Did you forget your password?</span></p>
          </div>
          <div className="login-to-register-page">
            <p>Don't have an account? <Link to="/register"><span>Register</span></Link></p>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </section>
  )
}

export default Login