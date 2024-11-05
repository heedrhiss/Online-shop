import { Offcanvas, Stack } from "react-bootstrap"
import { useCartContext } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"
import data from "../data/items.json"
import { formatCurrency } from "../utils/formatCurrency"

type ShoppingCartProps = {
    isOpen: boolean
}

export default function ShoppingCart({isOpen}: ShoppingCartProps) {
const {closeCart, cartItems} = useCartContext()
  return (
    <Offcanvas show={isOpen} placement="end" name="Cart" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            { cartItems.length == 0 ?
            <Stack><div>No Items found in your Cart</div></Stack> :
            <Stack gap={3}>
                {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
                <div className="ms-auto fw-bold fs-5">Total: {formatCurrency(
                    cartItems.reduce((total, item)=> {
                        const itemData = data.find(i => i.id === item.id)
                        return total + (itemData?.price || 0) * item.quantity
                    }, 0))
                }</div>
            </Stack> }
        </Offcanvas.Body>
    </Offcanvas>
  )
}
