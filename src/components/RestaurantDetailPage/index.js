import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  Row,
} from 'react-materialize';
import NewDishForm from './NewDishForm';
import DishList from './DishList';
import { addDish } from 'src/store/dishes/actions';

class RestaurantDetailPage extends Component {
  handleAddDish = (dishName) => {
    const restaurantName = this.props.match.params.name;
    this.props.addDish({
      restaurantName,
      dishName,
    });
    $('#addDishModal').modal('close');
  }

  render() {
    const { dishes } = this.props;
    const restaurantName = this.props.match.params.name;
    const restaurantDishes = dishes[restaurantName] || [];

    return (
      <div>
        <Link
          to="/"
          data-testid="backButton"
        >
          Back
        </Link>
        <Modal
          id="addDishModal"
          header="New Dish"
          actions={[]}
          trigger={
            <Button
              data-testid="addDishButton"
            >
              Add Dish
            </Button>
          }
        >
          <NewDishForm
            onSave={this.handleAddDish}
          />
        </Modal>
        <Row>
          <DishList
            restaurantName={restaurantName}
            dishNames={restaurantDishes}
          />
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dishes: state.dishes,
  };
}

const mapDispatchToProps = {
  addDish,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RestaurantDetailPage,
);
