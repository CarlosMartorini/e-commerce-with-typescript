import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

interface CartProvidersProps {
    children: ReactNode;
}

interface CartProviderData {
    cart: Product[];
}

const CartContext = createContext<CartProviderData>(
    {} as CartProviderData
)

export const CartProvider = ({children}: CartProvidersProps) => {
    const [cart, setCart] = useState<Product[]>([] as Product[]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{cart}}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);