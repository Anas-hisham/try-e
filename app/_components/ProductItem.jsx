import React from "react";
import Link from "next/link";
import Image from "next/image";
import { List } from "lucide-react";

const ProductTitle = ({ product }) => {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm 
      hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <Image
        src={product.banner.url}
        alt={product.name || "Product"}
        width={400}
        height={400}
        className="w-full h-[170px] object-cover"
      />
      <div className="p-3 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-1">
            {product.title}
          </h2>
          <h2 className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <List className="w-4 h-4 text-gray-400" />
            {product.category}
          </h2>
        </div>
        <h2 className="text-lg font-bold text-primary">${product.price}</h2>
      </div>
    </Link>
  );
};

export default ProductTitle;
