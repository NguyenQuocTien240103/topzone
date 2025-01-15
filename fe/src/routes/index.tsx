import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import LoadComponent from './LoadComponent';
import MainLayout from '../layouts/MainLayout/index';
import CartLayout from '../layouts/CartLayout/index';
import Login from '../pages/Auth/Login/index';
import Register from '../pages/Auth/Register/index';
import ForgotPassword from '../pages/Auth/ForgotPassword/index';
import Home from '../pages/Home/index';
import Product from '../pages/Product/index';
import ProductDetail from '../pages/ProductDetail/index';
import Cart from '../pages/Cart/index';
const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/cart' Component={CartLayout}>
                <Route index element={<LoadComponent component={Cart} />} />
            </Route>
            <Route path='/' Component={MainLayout}>
                <Route index element={<LoadComponent component={Home} />} />
                <Route path='/login' element={<LoadComponent component={Login} />} />
                <Route path='/register' element={<LoadComponent component={Register} />} />
                <Route path='/forgot-password' element={<LoadComponent component={ForgotPassword} />} />
                <Route path='/products' element={<LoadComponent component={Product} />} />
            </Route>
        </Routes>
    );
};

export default AllRoutes