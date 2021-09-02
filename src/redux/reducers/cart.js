const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

function cart(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
      ? [action.payload]
      : [
          ...state.items[action.payload.id].items,
          action.payload,
        ];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const items = Object.values(newItems).map(obj => obj.items)
      const allPizzas = [].concat.apply([], items);

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
      };
    }

    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      }

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    };

    case 'ADD_CART_ITEM': {
      const newItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          }
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + newItems[0].price,
      }
    }
      

    case 'SUB_CART_ITEM': {
      const items = state.items[action.payload].items;
      const newItems = items.length > 1 ? items.slice(1) : items;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          }
        },
        totalCount: items.length > 1 ? state.totalCount - 1 : state.totalCount,
        totalPrice: items.length > 1 ? state.totalPrice - newItems[0].price : state.totalPrice,
      }
    };

    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      }

    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      }

    default: return state;
  }
}

export default cart;
