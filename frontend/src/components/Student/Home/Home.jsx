import "./Home.css";
import { useEffect } from "react";
import MetaData from "../../MetaData";
import { useSelector } from "react-redux";
import homeImg from "../../../assets/home.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Sidebar/Footer";

const Home = () => {

  const navigate = useNavigate();

  const { student } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (student && student.role === "admin") {
      navigate("/dashboard");
      window.location.reload();
    }
  }, [navigate, student]);


  return (
    <>
      <MetaData title="Canteen App" />

      <Footer/>

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
    </>
  );
};

export default Home;
