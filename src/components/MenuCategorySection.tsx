import React from 'react';
import MenuItem from './MenuItem';

interface MenuCategorySectionProps {
  categoryName: string;
  items: any[];
  showCategoryHeading?: boolean;
}

const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({
  categoryName,
  items,
  showCategoryHeading = true
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      {showCategoryHeading && (
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{categoryName}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategorySection;
