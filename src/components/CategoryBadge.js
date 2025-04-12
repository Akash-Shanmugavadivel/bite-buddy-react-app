
import React from 'react';

const CategoryBadge = ({ category, onClick, isSelected }) => {
  return (
    <span 
      className={`badge category-badge mx-1 px-3 py-2 ${
        isSelected ? 'bg-primary' : 'bg-light text-dark border'
      }`}
      onClick={() => onClick(category)}
      style={{ cursor: 'pointer' }}
    >
      {category.name || category}
    </span>
  );
};

export default CategoryBadge;
