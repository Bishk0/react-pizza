import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, PizzaBlock, SortPopup, PizzaLoadingBlock } from "../components";
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = [
  'Мясные',
  'Вегетарианскые',
  'Гриль',
  'Острые',
  'Закрытые',
];

const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();

  const state = useSelector(state => {
    return {
      items: state.pizzas.items,
      isLoaded: state.pizzas.isLoaded,
      category: state.filters.category,
      sortBy: state.filters.sortBy,
      cartItems: state.cart.items,
    }
  });

  useEffect(() => {
    dispatch(fetchPizzas(state.sortBy, state.category))
  }, [dispatch, state.category, state.sortBy]);

  

  const onSelectCategory = useCallback(index => dispatch(setCategory(index)), [dispatch]);
  const onSelectSortType = useCallback(type => dispatch(setSortBy(type)), [dispatch]);
  const handleAddPizzaToCart = obj => dispatch(addPizzaToCart(obj));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={categoryNames}
          activeCategory={state.category}
          onClickItem={onSelectCategory}
        />
        <SortPopup
          items={sortItems}
          activeSortType={state.sortBy.type}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">{state.category !== null ? categoryNames[state.category] : 'Все'} пиццы</h2>
      <div className="content__items">
        {state.isLoaded
          ? state.items.map(obj => (
              <PizzaBlock
                onAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={state.cartItems[obj.id] && state.cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12).fill(null).map((_, idx) => <PizzaLoadingBlock key={idx} />)
        }
      </div>
    </div>
  );
}

export default Home;
