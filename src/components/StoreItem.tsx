import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utils/formatCurrency"
import { useCartContext } from "../context/ShoppingCartContext"

interface itemProps {
    id: number
    name: string
    price: number
    imgUrl: string
}

export default function StoreItem({id, name, price, imgUrl}: itemProps) {
    const {getQuantity, icreaseQuantity, decreaseQuantity, removeItem} = useCartContext()
    const quantity = getQuantity(id)
  return (
    <Card className="">
      <Card.Img src={imgUrl} variant="top" height="200px" style={{objectFit: "cover"}}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {!quantity ? <Button className="w-100" onClick={()=> icreaseQuantity(id)}>+ Add to cart</Button> : 
          <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
            <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
              <Button onClick={()=> decreaseQuantity(id)}>-</Button>
              <div>
                <strong>{quantity}</strong> in cart
              </div>
              <Button onClick={()=> icreaseQuantity(id)}>+</Button>
            </div>
            <Button variant="danger" size="sm"
            onClick={()=> removeItem(id)}>Remove</Button>
          </div>
          }
        </div>
      </Card.Body>
    </Card>
  )
}
