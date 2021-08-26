import { useState } from "react";

function Categories({ items }) {
const [activeItem, setActiveItem] = useState(0);

  return (
    <div className='categories'>
      <ul>
        {items.map((item, idx) => (
          <li
            key={item}
            className={activeItem === idx ? 'active' : ''}
            onClick={() => setActiveItem(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
