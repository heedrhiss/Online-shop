import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/ShoppingCartContext";

export default function NavBar() {
  const {cartQuantity, openCart} = useCartContext()

  return (
    <Navbar sticky="top" className="bg-white shadow-lg mb-4">
        <Container>
            <Nav>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
            <Button variant="outline-primary rounded-circle" style={{position: "relative", width: "3rem", height: "3rem"}} onClick={openCart}>
                <BsCart3/>
                <div className="bg-danger rounded-circle d-flex justify-content-center align-items-center" style={{color: "white", width: "1.3rem", height: "1.3rem", position: "absolute", right: "0", bottom: "0", transform: "translate(25%, 25%)"}}>{cartQuantity}</div>
            </Button>
        </Container>
    </Navbar>
  )
}
