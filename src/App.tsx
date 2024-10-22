import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Store from "./pages/Store"
import { Container } from "react-bootstrap"
import NavBar from "./components/NavBar"
import ShoppingCartContext from "./context/ShoppingCartContext"


function App() {

  return (
    <BrowserRouter>
    <ShoppingCartContext>
    <NavBar/>
    <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/store" element={<Store/>}/>
    </Routes>
    </Container>
    </ShoppingCartContext>
    </BrowserRouter>
  )
}

export default App
