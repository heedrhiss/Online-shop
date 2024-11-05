import { Button, Stack } from "react-bootstrap";
import data from "../data/items.json"
import { formatCurrency } from "../utils/formatCurrency";
import { useCartContext } from "../context/ShoppingCartContext";

type CartItemProp = {
    item: {
        id: number;
        quantity: number;
    }
}
export default function CartItem({item}: CartItemProp) {
    const {removeItem} = useCartContext()
    const {id, quantity} = item
    const itemData = data.find((i: any) => i.id === id)
    if(itemData == null) return  null
  return (
    <Stack direction="horizontal" className="d-flex" gap={2}>
      <img src={itemData.imgUrl} alt={itemData.name} style={{height: "80px", width: "125px", objectFit: "cover"}} />
      <div className="me-auto">
        <div>{itemData.name} 
       {quantity > 1 && <span className="text-muted" style={{fontSize: ".75rem"}}> x{quantity}</span>}
        </div>
        <div className="text-muted" style={{fontSize: ".85rem"}}>
            {formatCurrency(itemData.price)}
        </div>
        </div>
        <div className="text-muted" style={{fontSize: "1rem"}}>
            {formatCurrency(itemData.price * quantity)}
        </div>
        <Button variant="outline-danger" size="sm" onClick={()=>removeItem(id)}>&times;</Button>
    </Stack>
  )
}
