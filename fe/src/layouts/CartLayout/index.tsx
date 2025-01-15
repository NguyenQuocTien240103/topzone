import { Outlet } from 'react-router-dom';
import Header from '../Header';

const CartLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default CartLayout
