import React, { useEffect, useState } from "react";
import Item from "../Items/ItemCard";
import "./Home.css";
import MetaData from "../../MetaData";
import { getItem } from "../../../actions/itemAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import homeImg from "../../../assets/home.jpg";
import Sidebar from "../Menu/Sidebar";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((state) => state.items);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getItem());
  }, [dispatch, error, alert]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <MetaData title="Canteen App" />
      <div className="hc-mc">
        <div className="hc-ld">
          <button onClick={toggleSidebar}>Toggle Sidebar</button>
          <h1 className="hc-hl">Welcome to Canteen</h1>
          <p className="hc-cp">
            Welcome to our virtual canteen, where culinary delight meets
            convenience. Discover a world of flavors at your fingertips, as you
            browse our mouthwatering menu and place your orders effortlessly.
            Whether it's a quick bite or a hearty meal, we're here to satisfy
            your cravings with a touch of culinary magic.
          </p>
        </div>
        <div className="hc-rd">
          <img className="hc-hi" src={homeImg} alt="" />
        </div>
      </div>
      <h1 className="hc-hl">Today's Featured Items</h1>
      <div className="hc-fp">
        {items && items.map((item) => <Item item={item} key={item._id} />)}
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Home;
