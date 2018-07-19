import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import RestaurantList from "./containers/restaurant_list";
import Navbar from "./components/navbar"
import RestaurantDetails from "./components/restaurant_details";

class App extends Component {
  render() {
    console.log(this.props.selectedRestaurant)
    return (
      <div>
        <div className="bottom-bordered">
        <Navbar />
        </div>
          {this.props.selectedRestaurant !== "none" ? (
            <RestaurantDetails
              deSelectRestaurant={this.props.deSelectRestaurant}
              restaurant={this.props.selectedRestaurant}
            />
          ) : null}
          <RestaurantList />
      </div>
    );
  }
  componentDidMount() {
    this.props.getRestaurants();
  }
}

function mapStateToProps(state) {
  return {
    restaurantList: state.restaurantList,
    selectedRestaurant: state.selectedRestaurant
  };
}

export default connect(mapStateToProps, actions)(App);
