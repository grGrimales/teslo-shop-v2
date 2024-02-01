import { ProductGrid, Title } from "../components";
import { initialData } from "../seed/seed";


const products= initialData.products;



export default function Page() {
    return <>
    <Title 
      title="Shop Page"
      subtitle="This is the Shop Page"
      className="mb-2"
    />

    <ProductGrid products={ products } />
    </>
  }
  