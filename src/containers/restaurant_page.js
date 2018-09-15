import React, { Component } from "react";
import ReviewForm from "./review_form"
import Review from "../components/review"
import Rating from "../components/rating"

class RestaurantPage extends Component{

  state = {
    reviewFormOpen: false
  }

  render(){

    const {restaurant} = this.props

    console.log(this.props)





    const handleClick = () =>{
      this.setState({reviewFormOpen: true})
    }

if (this.props.restaurant !== "none"){
    const reviews = restaurant.reviews.map(review =>{
    return <Review key={review.id} review={review}/>
  })

      return (
        <div className="restaurant-review-card">
          <h3>{restaurant.name} </h3>
          <Rating style={{width: "100px"}} rating={restaurant.average_rating} quality={restaurant.average_quality} cleanliness={restaurant.average_cleanliness} service={restaurant.average_service} value={restaurant.average_value}/>

          {restaurant.cuisine ? <h5>Cuisine: {restaurant.cuisine}</h5> : null}

          {restaurant.portion_size ? (<p>Portion Size: {restaurant.portion_size}</p>) : null}

          {restaurant.resort_name ? (<p>Resort: {restaurant.resort_name}</p>) : (<p>Park: {restaurant.park}</p>)}

          {restaurant.portion_size ? (<p>Portion Size: {restaurant.portion_size}</p>) : null}

          {reviews.length > 0 ? <div>{reviews}</div>: "Be the first to review this restaurant!"}
          <button onClick={handleClick}>New Review</button>
          {this.state.reviewFormOpen === true ? <div><ReviewForm restaurant_id={restaurant.id}/> </div>: null}
        </div>
      )}else {
        return (
          <div> Loading...</div>
        )
      }
    }
      componentDidMount(){
        this.props.selectRestaurant(this.props.renderProps.match.params)
      }
  };

export default RestaurantPage;
