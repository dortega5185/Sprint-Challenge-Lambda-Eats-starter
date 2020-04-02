import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Lambda Eats</h1>
      <h2>Snuggle In and order Delicious Food during this Corona Pandemic</h2>
      <img
        className="pizza"
        src="https://images.unsplash.com/photo-1558138838-6f561719b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Pizza"
      />
      <h3 className="order-here">Build your own Pizza below</h3>
      <Link to={"/pizza"} className="order-here">
        <div>Get Orderin'</div>
      </Link>
    </div>
  );
};

export default Home;
