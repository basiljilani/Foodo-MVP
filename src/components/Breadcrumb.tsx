import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    link?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Show first and last items, replace middle ones with ellipsis if more than 2 items
  const renderItems = () => {
    if (items.length <= 2) return items;
    
    return [
      items[0],
      { label: '...', link: undefined },
      items[items.length - 1]
    ];
  };

  return (
    <nav className="bg-white px-4 py-2">
      <ol className="flex items-center space-x-1">
        {renderItems().map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
            <li>
              {item.link ? (
                <Link
                  to={item.link}
                  className="text-gray-600 text-[13px]"
                >
                  {item.label}
                </Link>
              ) : item.label === '...' ? (
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              ) : (
                <span className="text-gray-900 text-[13px] font-medium">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
