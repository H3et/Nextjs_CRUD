import Link from "next/link";
import React from "react";

// Define the type for a breadcrumb item
interface BreadCrumbItem {
  title: string;
  url: string;
  active?: boolean;
}

// Define the type for the component props
interface BreadCrumbProps {
  lists: BreadCrumbItem[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ lists = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-2">
      <ol className="breadcrumb">
        {lists.map((list, key) => (
          <Link
            key={key}
            className={`breadcrumb-item ${list?.active ? "active" : ""} text-decoration-none`}
            href={`../${list?.url}`}
          >
            {list?.title}
          </Link>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
