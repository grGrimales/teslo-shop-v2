import {notFound} from "next/navigation";

interface Props{
  params:{
    id: string
  }
}

export default function Page({params}: Props) {
const {id} = params;
if ( id === 'kids') {
  notFound();
}


    return <h1>Hello, category Page!</h1>
  }
  