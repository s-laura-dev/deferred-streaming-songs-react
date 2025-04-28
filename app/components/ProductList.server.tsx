// app/components/ProductList.server.tsx
export default async function ProductList() {
    const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
    const products = await res.json();
  
    return (
      <div>
        {products.map((product: any) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    );
  }
  