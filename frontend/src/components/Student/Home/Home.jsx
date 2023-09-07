import React from 'react'
import Item from "../Items/ItemCard"
import "./Home.css"

const Home = () => {
    const item = {
      name:"Chicken Biryani",
      price:280,
      type:"veg",
      images:[{url:"https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/chicken-biryani-recipe.jpg"}],
      _id:"raj"
    }
  return (
    <>
    <div className='home-container'>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
    </div>
    </>
  )
}

export default Home