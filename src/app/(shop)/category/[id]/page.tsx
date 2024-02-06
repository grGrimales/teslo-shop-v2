import { ProductGrid, Title } from "@/app/components";
import { initialData } from "@/app/seed/seed";
import { Category } from "@/interfaces";
import {notFound} from "next/navigation";

interface Props{
  params:{
    id: Category;
  }
}

const seedData = initialData.products;

export default function Page({params}: Props) {
const {id} = params;
const products= seedData.filter(product => product.gender === id);

const labels: Record<Category, string> = {
  'men': 'Hombres',
  'women': 'Mujeres',
  'kid': 'Niños',
  'unisex': 'Unisex'
}

// if ( id === 'kids') {
//   notFound();
// }


    return  <>
      <Title
      title= {`Shop Page ${labels[id]}`}
      subtitle= {`This is the Shop Page${id}`}
      className="mb-2"
    />

    <ProductGrid products={ products } />
    </>
  }
  