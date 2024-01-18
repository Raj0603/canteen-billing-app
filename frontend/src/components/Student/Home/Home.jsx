import "./Home.css";
import MetaData from "../../MetaData";

import homeImg from "../../../assets/home.jpg";

const Home = () => {
  return (
    <>
      <MetaData title="Canteen App" />

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
