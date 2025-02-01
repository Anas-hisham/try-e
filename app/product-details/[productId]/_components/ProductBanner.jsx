import React from "react";
import Image from "next/image";

const ProductBanner = ({ product }) => {
  if (!product || !product.banner) {
    return (
      <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div>
      <Image
        src={product.banner.url}
        alt="product-details-banner"
        width={400}
        height={400}
        className="rounded-lg"
      />
    </div>
  );
};

export default ProductBanner;
