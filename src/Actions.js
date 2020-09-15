import React, { useState } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data.json";
import "./Actions.css";

const Actions = (props) => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  React.useEffect(() => {
    setAllRestaurants(data.restarants);
  }, []);

  // or
  // const setRestaurants = props.setRestaurants;

  const [showSortSelector, setSortSelector] = useState(false);
  const [showPriceFilter, setPriceFilter] = useState(false);
  const [showFoodFilter, setFoodFilter] = useState(false);

  /** GENERAL SORTING */

  const handleGeneralSorting = (restaurants, sortBy) => {
    // console.log(restaurants);
    // console.log(sortBy);
    // const sortedRestaurants = [...restaurants].sort((a, b) => b.popularity - a.popularity); // not that easy?
    // not the ony way
    // let sortedRestaurants = []
    // if (sortBy === 'maxDeliveryTime') {
    //     sortedRestaurants = restaurants.slice().sort((a, b) => a[sortBy] - b[sortBy]); // not that easy?
    // } else {
    //     sortedRestaurants = restaurants.slice().sort((a, b) => b[sortBy] - a[sortBy]); // not that easy?
    // }
    // const sortedRestaurants = restaurants.slice().sort((a, b) => {
    //     if (sortBy === 'maxDeliveryTime') {
    //         return a[sortBy] - b[sortBy];
    //     }
    //     return b[sortBy] - a[sortBy]
    // }); // not that easy?

    let func;
    if (sortBy === "maxDeliveryTime") {
      func = (a, b) => a[sortBy] - b[sortBy]; // not that easy?
    } else {
      func = (a, b) => b[sortBy] - a[sortBy];
    }

    props.setRestaurants([...restaurants].sort(func));
    // console.log({ sortedRestaurants });
  };

  /** PRICE FILTER */

  const handlePriceFiltering = (array, filter) => {
    const priceFilteredRestaurants = array.filter((singleRestaurant) => {
      let found = singleRestaurant.description.match(/\$/g);
      if (found !== null) {
        return found.length === filter;
      }
    });

    props.setRestaurants(priceFilteredRestaurants);
  };

  const renderPriceFilter = () => {
    if (showPriceFilter) {
      return (
        <div className="PriceDropDown">
          <button
            className="PriceButton"
            onClick={() => {
              handlePriceFiltering(allRestaurants, 1);
              setPriceFilter(false);
            }}
          >
            $
          </button>
          <button
            className="PriceButton"
            onClick={() => {
              handlePriceFiltering(allRestaurants, 2);
              setPriceFilter(false);
            }}
          >
            $$
          </button>
          <button
            className="PriceButton"
            onClick={() => {
              handlePriceFiltering(allRestaurants, 3);
              setPriceFilter(false);
            }}
          >
            $$$
          </button>
          <button
            className="PriceButton"
            onClick={() => {
              handlePriceFiltering(allRestaurants, 4);
              setPriceFilter(false);
            }}
          >
            $$$$
          </button>
        </div>
      );
    }
  };

  /** FOOD FILTER */

  const handleFoodFiltering = (array, filter) => {
    const foodFilteredRestaurants = array.filter((singleRestaurant) => {
      let foodType = [];
      singleRestaurant.menu.forEach((category) => {
        category.items.forEach((meal) => {
          foodType.push(meal.typeOfMeal);
        });
      });

      const foundFood = foodType.find((element) => element === filter);

      return foundFood;
    });

    props.setRestaurants(foodFilteredRestaurants);
  };

  const renderFoodFilter = () => {
    if (showFoodFilter) {
      return (
        <div>
          <label>
            <FontAwesomeIcon icon={"leaf"} />
            Vegan
            <input
              value="vegan"
              type="radio"
              name="foodFilter"
              onChange={() => {
                handleFoodFiltering(allRestaurants, "vegan");
                setFoodFilter(false);
              }}
            />
          </label>
          <label>
            <FontAwesomeIcon icon={"heart"} />
            Vegetarian
            <input
              value="vegetarian"
              type="radio"
              name="foodFilter"
              onChange={() => {
                handleFoodFiltering(allRestaurants, "vegetarian");
                setFoodFilter(false);
              }}
            />
          </label>
          <label>
            <FontAwesomeIcon icon={"egg"} />
            Non-vegan
            <input
              value="non vegan"
              type="radio"
              name="foodFilter"
              onChange={() => {
                handleFoodFiltering(allRestaurants, "non vegan");
                setFoodFilter(false);
              }}
            />
          </label>
        </div>
      );
    }
  };

  /** ..cd ACTIONS */

  return (
    <div className="actions">
      <span className="button-group">
        <button onClick={() => setSortSelector(!showSortSelector)}>
          <span>Sort</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector && (
          <div>
            <label>
              Most popular{" "}
              <input
                value="popularity"
                type="radio"
                name="generalSort"
                onChange={(event) => {
                  console.log("popularity");
                  handleGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  );
                }}
              />
            </label>
            <label>
              Rating{" "}
              <input
                value="rating"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handleGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Delivery time{" "}
              <input
                value="maxDeliveryTime"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handleGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
          </div>
        )}
      </span>

      {/* TODO */}
      {/* <!-- Implement as assignment for Thursday --> */}
      <span className="button-group">
        <button onClick={() => setPriceFilter(!showPriceFilter)}>
          <span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {renderPriceFilter()};
      </span>
      <span className="button-group">
        <button onClick={() => setFoodFilter(!showFoodFilter)}>
          <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {renderFoodFilter()}
      </span>
    </div>
  );
};
export default Actions;
