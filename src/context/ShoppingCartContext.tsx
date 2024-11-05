import { createContext, useContext } from "react";
import { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: React.ReactNode
}

interface CartContextType {
    getQuantity: (id: number) => number
    icreaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeItem: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    openCart: () => void
    closeCart: () => void
}

type CartItem = {
    id: number
    quantity: number
}


export const CartContext = createContext({} as CartContextType)

export default function ShoppingCartContext({children}: CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shop-cart",[])
  const [isOpen, setIsOpen] = useState(false)
function getQuantity(id: number) {
        return cartItems.find(curItem=> curItem.id === id)?.quantity || 0
      }

function icreaseQuantity(id: number) {
        setCartItems(curItem=> {
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
        setCartItems(curItem=> {
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
        setCartItems(curItem=> {
          return curItem.filter(curItem=> curItem.id !== id)
        })
    }
 const openCart = ()=> setIsOpen(true)
 const closeCart = ()=> setIsOpen(false)

const cartQuantity = cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)

  return (
    <CartContext.Provider value={{getQuantity, icreaseQuantity, decreaseQuantity, removeItem,  cartQuantity, cartItems, openCart, closeCart}}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  )
}

export function useCartContext(){
const context = useContext(CartContext)
return context
}
