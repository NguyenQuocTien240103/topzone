import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import CartLayout from '@/layouts/CartLayout';
import LoadComponent from './LoadComponent';

const Cart = lazy(() => import('@/pages/Cart'))
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'))
const Product = lazy(() => import('@/pages/Product'))
const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/cart' element={<CartLayout />}>
                <Route index element={<LoadComponent component={Cart} />} />
            </Route>
            <Route path='/' element={<MainLayout />}>
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