import { createContext, useContext } from "react";
import { useState } from "react";

type CartProviderProps = {
  children: React.ReactNode
}

interface CartContextType {
    getQuantity: (id: number) => number
    icreaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeItem: (id: number) => void
}

type CartItem = {
    id: number
    quantity: number
}


export const CartContext = createContext({} as CartContextType)

export default function ShoppingCartContext({children}: CartProviderProps) {
function getQuantity(id: number) {
        return cartItem.find(curItem=> curItem.id === id)?.quantity || 0
      }

function icreaseQuantity(id: number) {
        setCartItem(curItem=> {
          if(curItem.find(curItem=> curItem.id === id) == null) {
            return [...curItem, {id, quantity: 1}]
          } else {
            return curItem.map(curItem=> {
              if(curItem.id === id) {
                return {...curItem, quantity: curItem.quantity + 1}
              } else {
                return curItem
              }
            })
          }
        })
    }

function decreaseQuantity(id: number) {
        setCartItem(curItem=> {
          if(curItem.find(curItem=> curItem.id === id)?.quantity === 1) {
            return curItem.filter(curItem=> curItem.id !== id)
          } else {
            return curItem.map(curItem=> {
              if(curItem.id === id) {
                return {...curItem, quantity: curItem.quantity - 1}
              } else {
                return curItem
              }
            })
          }
        })
    }

function removeItem(id: number) {
        setCartItem(curItem=> {
          return curItem.filter(curItem=> curItem.id !== id)
        })
    }

const [cartItem, setCartItem] = useState<CartItem[]>([])
  return (
    <CartContext.Provider value={{getQuantity, icreaseQuantity, decreaseQuantity, removeItem}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext(){
const context = useContext(CartContext)
return context
}
