import { getHandleOfProduct, getProductById } from '@/data/shopify'; 
import { redirect } from 'next/navigation';
import Products from '@/components/Products';

export default async function ProductPage({ params }: { params: { handle: string } }) {    
    const product = await getHandleOfProduct(params.handle);
    
    if(!product) {
        redirect('/')
    }
    const bundle = await getProductById(product?.metafield?.value ?? "");

    return (
        <Products product={product} />
    );
};