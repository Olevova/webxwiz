import { useEffect, useState, useRef, useContext, createContext, useCallback } from "react";

const CartContext = createContext();
console.log(CartContext, 'CartContext');

// export const useCart = () => useContext(cartContext);
// const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
// const saveJSON = (key, date) => localStorage.setItem(key, JSON.stringify(date));

export const CartProvide = ({ children }) => {
    const [items, setItems] = useState([]);
    const [cardtoggle, setCardtoggle] = useState(false);

    const toggleCard = ()=> {
        setCardtoggle(!cardtoggle)
        }

    const addToCart = (newProduct) => {
        setItems(prev => {
            const cardItems = items.find((item) => item._id === newProduct._id);
            if (cardItems) {
                const updateCard = { ...cardItems, quant: newProduct.quant + cardItems.quant }
                const newCardItems = prev.map((item)=>{ return item._id===newProduct._id?updateCard:item}) 
                return newCardItems
            }
            else {
                return [...prev, newProduct]
            }

        })
        
    }

    const delCardItem = (product) => {
        setItems(prev => {
            return prev.filter((item) => item._id !== product._id)
             
        } )
        
    }

  
    return (
        <CartContext.Provider value={{items,cardtoggle, toggleCard, delCardItem, addToCart  }}>
            {children}
        </CartContext.Provider>
    )

}

export function useCartContext() {
    return useContext(CartContext)
}