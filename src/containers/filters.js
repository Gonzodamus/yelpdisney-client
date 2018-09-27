import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'semantic-ui-react'
import * as actions from '../actions'
import Options from '../services/data'


class Filters extends React.Component{

  handleChange = (event, value) => {
    if(value.name === "parkFilter"){
      this.props.applyParkFilter(value.value)
    } else if (value.name === "cuisineFilter") {
      this.props.applyCuisineFilter(value.value)
    } else if (value.name === "categoryFilter") {
      this.props.applyCategoryFilter(value.value)
    }
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <h5>Filter Results By:</h5>
        <Dropdown
          placeholder={'Park'}
          options={Options.parkOptions}
          selection
          onChange={this.handleChange}
          value={this.props.parkFilter}
          name="parkFilter"
          className="filter"
        />
        <Dropdown
          placeholder={'Cuisine'}
          options={Options.cuisineOptions}
          selection
          onChange={this.handleChange}
          value={this.props.cuisineFilter}
          name="cuisineFilter"
          className="filter"
        />
        <Dropdown
          placeholder={'Category'}
          options={Options.categoryOptions}
          selection
          onChange={this.handleChange}
          value={this.props.categoryFilter}
          name="categoryFilter"
          className="filter"
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    parkFilter: state.parkFilter,
    cuisineFilter: state.cuisineFilter,
    categoryFilter: state.categoryFilter
  }
}

export default connect(mapStateToProps, actions)(Filters)
