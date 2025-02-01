

import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import BreadCrumb from "../../_components/BreadCrumb";

export async function generateStaticParams() {
  const res = await fetch("https://api.jsonbin.io/v3/b/679d36a5acd3cb34a8d62ea0");
  const data = await res.json();

  return data.record.data.map((product) => ({
    productId: product.id.toString(), // Convert to string for static paths
  }));
}

export default async function ProductDetails({ params }) {
  const { productId } = params; // ✅ Get productId from params
  const res = await fetch("https://api.jsonbin.io/v3/b/679d36a5acd3cb34a8d62ea0");
  const data = await res.json();

  const products = data.record.data;
  const filteredProduct = products.find((product) => product.id.toString() === productId);
  const filteredRelated = products.filter((product) => product.category === filteredProduct?.category);

  return (
    <div className="px-10 py-10 md:px-28">
      <BreadCrumb path={`/product-details/${productId}`} />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-0 justify-around">
        <ProductBanner product={filteredProduct} />
        <ProductInfo product={filteredProduct} />
      </div>
      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        <ProductList productList={filteredRelated} />
      </div>
    </div>
  );
}
