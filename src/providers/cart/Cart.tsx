import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

interface CartProvidersProps {
    children: ReactNode;
}

interface CartProviderData {
    cartList: Product[];
}

const CartContext = createContext<CartProviderData>(
    {} as CartProviderData
)

export const CartProvider = ({children}: CartProvidersProps) => {
    const [cart, setCart] = useState<Product[]>([] as Product[]);
    //como passar a linha abaixo dentro do useState ?????
    //JSON.parse(localStorage.getItem('cart')) || []

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{cartList, setCart}}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);