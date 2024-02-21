import "./Menu.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu/${keyword}`);
    } else {
      navigate("/menu");
    }
  };

  return (
    
      <form className="im-fib" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search Dishes"
          className="im-sbx"
          onKeyDown={(e) => {
            e.key === "Enter" ? setKeyword(e.target.value) : null;
          }}
        ></input>
      </form>
  );
};

export default Filter;
