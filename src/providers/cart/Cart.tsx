import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../../types/Product";

interface ProviderProps {
    children: ReactNode,
}

interface ProviderData {
    cart: Product[],
    setCart: (products: Product[]) => void,
}


const CartContext = createContext<ProviderData>({} as ProviderData);

export const CartProvider = ({ children }: ProviderProps) => {

    const [cart, setCart] = useState<Product[]>([]); 
    
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '' ) || [])
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider 
            value={{ cart, setCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
