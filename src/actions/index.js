import {
  GET_RESTAURANTS,
   SELECT_RESTAURANT,
    APPLY_FILTER
  } from "./types";
import api from "../services/api";

export const getRestaurants = () => dispatch => {
  api.getRestaurants.then(restaurantList =>
    dispatch({ type: GET_RESTAURANTS, payload: restaurantList })
  )
}

export const selectRestaurant = (restaurant) => dispatch => {
  api.getRestaurant(`${restaurant.permalink}`).then(restaurant =>
  dispatch({type: SELECT_RESTAURANT, payload: restaurant})
)}

export const submitReview = (review) => dispatch => {
  api.submitReview(review).then(restaurant =>
  dispatch({type: SELECT_RESTAURANT, payload: restaurant})
)
}

export const searchRestaurants = (query) => dispatch => {
  api.searchRestaurants(query).then(restaurantList =>
  dispatch({ type: GET_RESTAURANTS, payload: restaurantList })
 )
}

export const applyFilter = (filter) => dispatch => {
  dispatch({ type: APPLY_FILTER, payload: filter })
}
