import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
 
type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
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

            toast.success("Product added to cart👍", { id: 'success1'})
            localStorage.setItem('edukaCartItems', JSON.stringify(updatedCart))

            return updatedCart;
        })
    }, [])


    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            SetCartProducts(filteredProducts)
            toast.success('Product removed from cart!', {id: 'success1'})
            localStorage.setItem("edukaCartItems", JSON.stringify(filteredProducts))
        }
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
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