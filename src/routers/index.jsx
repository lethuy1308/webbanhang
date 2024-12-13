import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AdminOrder, Buy, DangKy, Dangnhap, Home, Sanpham } from "../pages";
import ProductDetail from "../pages/ProductDetail";
import Order from "../pages/Order";



const Routers = () => {
    return (
       <>
       <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dangky" element={<DangKy />} />
                <Route path="/dangnhap" element={<Dangnhap />} />
                <Route path="/sanpham" element={<Sanpham />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/order" element={<Order />} />
                <Route path="/admin" element={<AdminOrder />} />
            </Routes>
       </Router>
       </>
    );
};
export default Routers;