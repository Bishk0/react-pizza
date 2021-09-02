import React from "react";

const Categories = React.memo(function Categories(
  { activeCategory, items, onClickItem }) {
  const onSelectItem = index => {
    onClickItem(index);
  }

  return (
    <div className='categories'>
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onSelectItem(null)}
        >Все</li>
        {items.map((item, idx) => (
          <li
            key={item}
            className={activeCategory === idx ? 'active' : ''}
            onClick={() => onSelectItem(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
