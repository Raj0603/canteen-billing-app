import "./Menu.css";
import { useSelector, useDispatch } from "react-redux";
// import vegImg from "../../../assets/iv.png"
// import nonVegImg from "../../../assets/inv.png"
import { useEffect, useState } from "react";
import { getItem } from "../../../actions/itemAction";
import { useAlert } from "react-alert";
import Loading from "../../Loading/Loading";
import MetaData from "../../MetaData";
import ItemCard from "../Items/ItemCard";
import Filter from "./filter";
import { useParams } from "react-router-dom";
import {ChevronDown , ChevronUp } from "lucide-react"

const Menu = () => {
  const alert = useAlert();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((state) => state.items);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const categories = ["", "Breakfast", "Snacks", "Lunch"];
  const [rating, setRating] = useState(0);
  const [menu, setMenu] = useState()
  const [sortOrder, setSortOrder] = useState("normal");
  // const [sortOrder, setSortOrder] = useState("");

  const keywords = keyword;

  const handleCategoryClick = () => {
    const currentIndex = categories.indexOf(category);
    const nextIndex = (currentIndex + 1) % categories.length;
    setCategory(categories[nextIndex]);
  };

  const handleVegClick = () => {
    setType((prevType) => (prevType === "Veg" ? "" : "Veg"));
  };
  const handleNVegClick = () => {
    setType((prevType) => (prevType === "Non Veg" ? "" : "Non Veg"));
  };

  const handleRatingClick = () => {
    setRating((prevRating) => (prevRating === 4 ? 0 : 4));
  };



  // Function to compare prices for sorting
  // const handlePrice = () => {
  //   const sortedMenu = [...menu].sort((a, b) => a.price - b.price);
  //   setMenu(sortedMenu);
  //   console.log(sortedMenu);
  // };

  const handlePriceClick = () => {
    if(sortOrder==="normal"){

      setSortOrder("asc");
      const sortedMenu = [...menu].sort((a, b) => a.price - b.price);
      setMenu(sortedMenu);
    }
    else if(sortOrder==="asc"){
      setSortOrder("desc");
      const sortedMenu = [...menu].sort((a, b) => b.price - a.price);
      setMenu(sortedMenu);
    }
    else{
      setSortOrder("normal");
      const sortedMenu = items;
      setMenu(sortedMenu);
    }
    
  };

  useEffect(()=>{
    setMenu(items)
  },[items])

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getItem(keywords, rating, category, type));
  }, [dispatch, error, alert, keywords, category, type, rating]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Menu" />
          <div className="im-mc">
            <div className="im-fs">
              <button className="im-fl" onClick={handleVegClick}>
                Veg
              </button>
              <button className="im-fl" onClick={handleNVegClick}>
                Non Veg
              </button>
              <button className="im-fl" onClick={handlePriceClick}>Price {sortOrder==="desc"?<ChevronDown size={16}/>:""}{sortOrder==="asc"?<ChevronUp size={16}/>:""}</button>
              <button className="im-fl" onClick={handleCategoryClick}>
                {category ? category : "Category"}
              </button>
              <button className="im-fl" onClick={handleRatingClick}>
                Ratings (above 4)
              </button>
              <Filter />
            </div>
            <div className="im-fp">
              {menu &&
                menu.map((item) => <ItemCard item={item} key={item._id} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
