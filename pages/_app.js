import {CartProvide} from '@/context/cardContext';
import '../app/globals.css';
import { AuthProvider } from '@/context/authContext';
export default function App({ Component, pageProps }) {
  return (
    <CartProvide>
      <AuthProvider>
        <Component {...pageProps} />
        </AuthProvider>
    </CartProvide>)
}