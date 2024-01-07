import React, { useEffect, useState } from "react";
import ItemCard from "../Items/ItemCard";
import "./Home.css";
import MetaData from "../../MetaData";
import { getItem } from "../../../actions/itemAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import homeImg from "../../../assets/home.jpg";
import Loading from "../../Loading/Loading";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((state) => state.items);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getItem());
  }, [dispatch, error, alert]);

  return (
    <>
    {loading? <Loading/> :     <>
      <MetaData title="Canteen App" />
      {/* <StudentNavbar/>
      <Sidebar/> */}
      <div className="hc-mc">
        <div className="hc-ld">
          <h1 className="hc-hl1">Welcome to Canteen</h1>
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
      <h1 className="hc-hl2">Today's Featured Items</h1>
      <div className="hc-fp">
        {items && items.map((item) => <ItemCard item={item} key={item._id} />)}
      </div>

    </>}
    </>
  );
};

export default Home;
