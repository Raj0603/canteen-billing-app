import "./App.css";
import Home from "./components/Student/Home/Home";
import { Routes, Route } from "react-router-dom";
import ItemDetails from "./components/Student/Items/ItemDetails";
import Sidebar from "./components/Student/Sidebar/Sidebar";
import Menu from "./components/Student/Menu/Menu";
import StudentNavbar from "./components/Student/StudentNavbar/StudentNavbar";
import UserRegistration from "./components/Registration/UserRegistration";
import UserLogin from "./components/Registration/UserLogin";
import { useEffect } from "react";
import Store from "./Store";
import { loadStudent } from "./actions/studentAction";
import { useSelector } from "react-redux";
import StudentProfile from "./components/Student/Profile/StudentProfile";
import ForgotPassword from "./components/Registration/ForgotPassword";
import ResetPassword from "./components/Registration/ResetPassword";
import Cart from "./components/Student/Cart/Cart";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSuccess from "./components/Student/Orders/OrderSuccess";
import { MyOrder } from "./components/Student/Orders/MyOrder";
import Dashboard from "./components/Admin/Dashboard";
import OwnerList from "./components/Admin/OwnerList";
import StudentList from "./components/Admin/StudentList";
import OrderList from "./components/Admin/OrderList";
import AdminSidebar from "./components/Admin/AdminSidebar";
import Footer from "./components/Student/Sidebar/Footer";

function App() {
  const { isAuthenticated, student } = useSelector((state) => state.student);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname !== "/menu" &&
      location.pathname !== "/sregister" &&
      location.pathname !== "/slogin"
    ) {
      Store.dispatch(loadStudent());
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   function handleResize() {
  //     if (window.innerWidth < 700 && !isAuthenticated) {
  //       navigate('/slogin');
  //     }
  //   }

  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, [isAuthenticated, navigate]);

  return (
    <>
      <StudentNavbar />
      {isAuthenticated && student?.role === "student" && <Sidebar />}
      {/* {isAuthenticated && student?.role === "student" && <Footer />} */}
      {isAuthenticated && student?.role === "admin" && <AdminSidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route path="/menu/:keyword" element={<Menu />} />
        <Route exact path="/sregister" element={<UserRegistration />} />
        <Route exact path="/slogin" element={<UserLogin />} />
        <Route exact path="/saccount" element={<StudentProfile />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/ordersuccess" element={<OrderSuccess />} />
        <Route exact path="/myorders" element={<MyOrder />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/ownerlist" element={<OwnerList />} />
        <Route exact path="/studentlist" element={<StudentList />} />
        <Route exact path="/orderlist" element={<OrderList />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
