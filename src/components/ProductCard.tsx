import React from "react";
import type { Product } from "../data/products";

interface Props {
  product: Product;
  style: React.CSSProperties;
}

export default function ProductCard({ product, style }: Props) {
  return (
    <div
      className="absolute w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden"
      style={style}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">₹{product.price}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
              <span className="text-sm text-green-600">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
