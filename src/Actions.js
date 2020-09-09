import React, { useState } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = (props) => {
  // or
  // const setRestaurants = props.setRestaurants;

  const [showSortSelector, setSortSelector] = useState(false);
  const [showPriceFilter, setPriceFilter] = useState(false);

  /** test
   * - 1
   * - 2
   */
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

  // restaurants.description
  // regex = /$
  // found = restaurants.description.match(regex)




  const handleFiltering = (restaurants, filter) => {
    const filteredRestaurants = restaurants.filter((item) => {
      let found = item.description.match(/\$\$\$/g);

      console.log(found);
      return found;
    });

    console.log(filteredRestaurants);

    props.setRestaurants(filteredRestaurants);
  };



  const renderPriceFilter = () => {
    if (showPriceFilter) {
      return (
        <div>
          <button onClick={() => handleFiltering(props.restaurants, "$$$")}>
            <span>$$$</span>
          </button>
          <button onClick={() => handleFiltering(props.restaurants, "$")}>
            <span>$</span>
          </button>
        </div>
      );
    }
  };

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
        <button>
          <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
      </span>
    </div>
  );
};
export default Actions;
