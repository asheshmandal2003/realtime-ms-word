import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./components/home/Home"
import {v4 as uuid} from "uuid"
import { useEffect } from "react"

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.pathname)
  useEffect(()=>{
    const redirect = () => {
      if(location.pathname ==="/"){
        navigate(`/document/${uuid()}`)
      }
    }
    redirect()
  },[])
  return(
    <>
    <Routes>
      <Route path={"/document/:documentId"} element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
