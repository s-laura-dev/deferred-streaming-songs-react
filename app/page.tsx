// app/page.tsx
import ProductList from './components/ProductList.server';

export default function Home() {
  return (
    <main>
      <h1>All Products</h1>
      <ProductList />
    </main>
  );
}
