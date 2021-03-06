import {
  ADD_RESTAURANT,
  STORE_RESTAURANTS,
  addRestaurant,
  loadRestaurants,
} from 'store/restaurants/actions';
import api from 'store/api';
jest.mock('store/api');

describe('restaurant actions', () => {
  describe('loadRestaurants', () => {
    it('store restaurants retrieved from the API', () => {
      const restaurants = [
        {
          type: 'restaurants',
          id: '1',
          attributes: {
            name: 'Sushi Place',
          },
        },
        {
          type: 'restaurants',
          id: '2',
          attributes: {
            name: 'Burger Place',
          },
        },
      ];

      const dispatch = jest.fn();

      api.get.mockResolvedValue({
        data: {
          data: restaurants,
        },
      });

      return loadRestaurants()(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: STORE_RESTAURANTS,
            restaurants,
          });
        });
    });
  });

  describe('addRestaurant', () => {
    const name = 'Sushi Place';
    const partialRestaurant = {
      type: 'restaurants',
      attributes: {
        name,
      },
    };

    const restaurant = {
      ...partialRestaurant,
      id: '42',
    };

    let dispatch;

    beforeEach(() => {
      api.post.mockResolvedValue({
        data: {
          data: restaurant,
        },
      });

      dispatch = jest.fn();
      return addRestaurant(name)(dispatch);
    });

    it('sends the new restaurant to the server', () => {
      expect(api.post).toHaveBeenCalledWith(
        '/restaurants',
        { data: partialRestaurant },
      );
    });

    it('stores the new restaurant in the state', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ADD_RESTAURANT,
        restaurant,
      });
    });
  });
});
