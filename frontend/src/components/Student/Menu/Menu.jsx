import React from "react";
import "./Menu.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItem } from "../../../actions/itemAction";
import { useAlert } from "react-alert";
import Loading from "../../Loading/Loading";
import MetaData from "../../MetaData";
import ItemCard from "../Items/ItemCard";

const Menu = () => {
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Menu" />
          <div className="im-mc">
            <div className="im-fp">
              {items &&
                items.map((item) => <ItemCard item={item} key={item._id} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
