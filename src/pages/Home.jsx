import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, PizzaBlock, SortPopup } from "../components";
import { setCategory } from '../redux/actions/filters';

const categoryNames = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alphabet' },
];

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      items: state.pizzas.items,
    }
  });

  const onSelectCategory = useCallback(index => dispatch(setCategory(index)), []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames}
          onClickItem={onSelectCategory}
        />
        <SortPopup items={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {state.items.map(obj => (
          <PizzaBlock
            key={obj.id}
            {...obj}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
