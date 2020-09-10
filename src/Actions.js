import React, { useState } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = (props) => {
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

  const handlePriceFiltering = (restaurants, filter) => {
    const filteredRestaurants = restaurants.filter((item) => {
      let found = item.description.match(/\$/g);
      if (found !== null) {
        return found.length === filter 
      }
    });

    console.log(filteredRestaurants);

    props.setRestaurants(filteredRestaurants);
  };


  const renderPriceFilter = () => {
    if (showPriceFilter) {
      return (
        <div>
          <button onClick={() => handlePriceFiltering(props.restaurants, 1)}>
            <span>$</span>
          </button>
          <button onClick={() => handlePriceFiltering(props.restaurants, 2)}>
            <span>$$</span>
          </button>
          <button onClick={() => handlePriceFiltering(props.restaurants, 3)}>
            <span>$$$</span>
          </button>
          <button onClick={() => handlePriceFiltering(props.restaurants, 4)}>
            <span>$$$$</span>
          </button>
        </div>
      );
    }
  };





/** FOOD FILTER */

  const handleFoodFiltering = (restaurants, filter) => {
    
  };

  const renderFoodFilter = () => {
    if (showFoodFilter) {
      return (
        <div>
        <button 
        // onClick={() => handleFoodFiltering()}
        >
          <span>Vegetarian</span>
        </button>
        <button>
          <span>Vegan</span>
        </button>
        <button>
          <span>Non-vegan</span>
        </button>
        </div>
      )
    }
  }




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
