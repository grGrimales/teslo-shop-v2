import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
}

export const ProductImage = ({ src, alt, className, width, height, style }: Props) => {
  
 // Función auxiliar para determinar la fuente de la imagen
 const getValidSrc = (src: string | undefined): string => {
  if (!src || src.trim() === '' || src === 'null' || src === 'undefined') {
    return '/imgs/No_Image_Available.jpg'; // Imagen por defecto si src no es válido
  } else if (src.startsWith('http')) {
    return src; // Devuelve src si es una URL completa
  } else {

    return `/products/${src}`; // Construye la ruta si es un nombre de archivo
  }
};

const localSrc = getValidSrc(src); // Obtiene la fuente válida usando la función auxiliar
console.log(localSrc, 'localSrc**********localSrc');
  return (
    <Image
      alt={alt}
      src={localSrc}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
