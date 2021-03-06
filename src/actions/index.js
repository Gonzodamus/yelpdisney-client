import {
   GET_RESTAURANTS,
   SELECT_RESTAURANT,
   APPLY_PARK_FILTER,
   APPLY_CUISINE_FILTER,
   APPLY_CATEGORY_FILTER,
   TOGGLE_FETCH_COMPLETE,
   SET_CUISINE_OPTIONS,
   SET_CURRENT_USER,
   HANDLE_ERROR,
  }
  from "./types"
import api from "../services/api"
import Options from "../services/data"

export const getRestaurants = () => dispatch => {
  api.getRestaurants.then(restaurantList =>
    dispatch({ type: GET_RESTAURANTS, payload: restaurantList })
  )}

export const resetRestaurants= () => dispatch => {
  dispatch({ type: GET_RESTAURANTS, payload: []})
}

export const searchRestaurants = (query) => dispatch => {
  dispatch({type: TOGGLE_FETCH_COMPLETE, payload: false})
  api.searchRestaurants(query).then(restaurantList =>{
    let cuisineTypes = restaurantList.map(restaurant => {
        return restaurant.cuisine
    })
    let uniqueTypes = [...new Set(cuisineTypes)]
    let parsedCuisine = Options.parseCuisineOptions(uniqueTypes)
    dispatch({ type: GET_RESTAURANTS, payload: restaurantList })
    dispatch({type:SET_CUISINE_OPTIONS, payload: parsedCuisine})})
    .then(success => dispatch({type: TOGGLE_FETCH_COMPLETE, payload: true})
)}

export const selectRestaurant = (restaurant) => dispatch => {
  api.getRestaurant(`${restaurant.permalink}`).then(restaurant =>
  dispatch({type: SELECT_RESTAURANT, payload: restaurant})
)}

export const submitReview = (review) => dispatch => {
  api.submitReview(review).then(restaurant =>
  dispatch({type: SELECT_RESTAURANT, payload: restaurant})
)}

export const applyParkFilter = (park) => dispatch => {
  dispatch({ type: APPLY_PARK_FILTER, payload: park })
}

export const applyCuisineFilter = (cuisine) => dispatch => {
  dispatch({ type: APPLY_CUISINE_FILTER, payload: cuisine })
}

export const applyCategoryFilter = (category) => dispatch => {
  dispatch({ type: APPLY_CATEGORY_FILTER, payload: category })
}

export const clearAllFilters = () => dispatch =>{
    dispatch({ type: APPLY_PARK_FILTER, payload: "" })
    dispatch({ type: APPLY_CUISINE_FILTER, payload: "" })
    dispatch({ type: APPLY_CATEGORY_FILTER, payload: "" })
}

export const toggleFetchComplete = (fetchComplete) => dispatch => {
  dispatch({ type: TOGGLE_FETCH_COMPLETE, payload: !fetchComplete})
}

export const login = (username, password, history) => dispatch => {
  api.login(username, password).then(user => {
    if (user.error) {
      localStorage.removeItem("token")
      const error = user.error
      dispatch({ type: SET_CURRENT_USER, payload: {user: null, token: null}})
      dispatch({ type: HANDLE_ERROR, payload: error })
    } else {
      localStorage.setItem("token", user.token)
      const error = null
      dispatch({ type: SET_CURRENT_USER, payload: user })
      dispatch({ type: HANDLE_ERROR, payload: error })
    }
  })
}

export const signup = (username, email, password, history) => dispatch => {
  api.signup(username, email, password).then(user =>{
    if (user.error){
      localStorage.removeItem("token")
      const error = user.error
      dispatch({ type: SET_CURRENT_USER, payload: {user: null, token: null}})
      dispatch({ type: HANDLE_ERROR, payload: error })
    } else {
      localStorage.setItem("token", user.token)
      const error = null
      dispatch({ type: SET_CURRENT_USER, payload: user })
      dispatch({ type: HANDLE_ERROR, payload: error })
      history.push("/")
    }
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem("token")
  dispatch({ type: SET_CURRENT_USER, payload: {user: null, token: null}})
}

export const getCurrentUser = () => dispatch => {
  api.getCurrentUser().then(res =>{
    dispatch({ type: SET_CURRENT_USER, payload: {user: res.user, token: localStorage.getItem("token")}})
  })
}

export const setError = error => dispatch =>{
  dispatch({ type: HANDLE_ERROR, payload: error })
}

export const clearError = () => dispatch =>{
  dispatch({ type: HANDLE_ERROR, payload: null })
}
