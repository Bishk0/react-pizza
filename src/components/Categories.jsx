import React, { useState } from "react";

const Categories = React.memo(function Categories({ items, onClickItem }) {
const [activeItem, setActiveItem] = useState(0);

const onSelectItem = index => {
  setActiveItem(index);
  onClickItem(index);
}

  return (
    <div className='categories'>
      <ul>
        {items.map((item, idx) => (
          <li
            key={item}
            className={activeItem === idx ? 'active' : ''}
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
