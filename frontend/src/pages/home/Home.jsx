
import Navbar from "../../components/navbar/Navbar"
import LeftSide from "../../components/leftSide/LeftSide"
import RightSide from "../../components/rightSide/RightSide"
import Timeline from "../../components/timeline/Timeline"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "./home.css"

const Home = () => {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <LeftSide />
        <Timeline />
        <RightSide />
      </div>
    </div>
  )
}
export default Home