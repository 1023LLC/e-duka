import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)


interface Props{
    [propname: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)

    const [cartProducts, SetCartProducts] = useState<CartProductType[] | null>(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('edukaCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems) 

        SetCartProducts(cProducts)
    }, [])
    
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        SetCartProducts((prev) =>{
            let updatedCart;

            if (prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }

            localStorage.setItem('edukaCartItems', JSON.stringify(updatedCart))

            return updatedCart;
        })
    }, [])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    }

    return (
        
        <CartContext.Provider value={value} {...props} />
    )
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context
}