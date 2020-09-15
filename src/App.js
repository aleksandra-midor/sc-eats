import "./App.css";
import React, { useState /*useCallback*/ } from "react";
import Actions from "./Actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faLeaf, faHeart, faEgg } from "@fortawesome/free-solid-svg-icons";
import data from "./data.json";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Faq from "./pages/FAQ/Faq.js";
import { Router, Link } from "@reach/router";

library.add(faChevronDown, faLeaf, faHeart, faEgg);

const Index = (props) => {
  return (
    <div className="restaurants">
      {props.restaurants.map((restaurant) => {
        return (
          <section key={restaurant.id}>
            <div className="overlay">
              <span className="tag">{getTag(restaurant)}</span>
              <img src={restaurant.img} alt="" />
            </div>
            <h2>{restaurant.name}</h2>
            <p className="description">{restaurant.description}</p>
          </section>
        );
      })}
    </div>
  );
};

const getTag = (restaurant) => {
  const { menu } = restaurant;
  let vegan = 0;
  let nonVegan = 0;
  menu.forEach((menuItem) => {
    vegan += menuItem.items.filter((item) => item.typeOfMeal === "vegan")
      .length;
    nonVegan += menuItem.items.filter((item) => item.typeOfMeal === "non vegan")
      .length;
  });
  let displayString = "";
  if (vegan > 0 && nonVegan === 0) {
    displayString = "vegeterian";
  } else if (vegan === 0 && nonVegan > 0) {
    displayString = "non-vegan";
  } else {
    displayString = "vegan och non vegan";
  }
  return (
    <span>
      {displayString}
      <br />
      Rating: {restaurant.rating}
      <br />
      <strong>{restaurant.popularity}</strong>
      <br />
      <em>Time: {restaurant.maxDeliveryTime} mins</em>
    </span>
  );
};

function App() {
  /** stan zmienialny */
  const [restaurants, setRestaurants] = useState([]);

  // Explore effect! (for classfull, this was related to componentWillMount, componentDidMount side effects) )
  React.useEffect(() => {
    setRestaurants(data.restarants);
  }, []);

  const [restaurantName, setName] = useState("");

  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">
            SC<span style={{ color: "#06c167" }}>eats</span>
          </Link>
          | <Link to="dashboard">Dashboard</Link> | <Link to="faq">Faq</Link>
        </nav>
        <Actions setRestaurants={setRestaurants} restaurants={restaurants} />
        <form className="searchFood" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for food"
            value={restaurantName}
            onBlur={(e) => setName(e.target.value)}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              // TODO - future implementation
            }}
          >
            Search
          </button>
        </form>
      </header>

      <Router>
        <Index restaurants={restaurants} path="/" />
        <Dashboard path="dashboard" />
        <Faq path="faq" />
      </Router>
    </div>
  );
}

export default App;
