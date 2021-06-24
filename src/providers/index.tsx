import { ReactNode } from 'react';
import { AuthProvider } from './authentication/Auth';
import { CartProvider } from './cart/Cart';

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    )
}

export default Providers;