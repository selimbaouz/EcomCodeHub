import ProductImage from '@/components/ProductImage';
import ImagesGallery from '@/components/ImagesGallery'; 
import { getHandleOfProduct, getProductById } from '@/data/shopify'; 
import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';
import StickyBar from '@/components/navigation/StickyBar';
import NavBar from '@/components/navigation/NavBar';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ExampleStore from '@/components/ExampleStore';
import HowItWorks from '@/components/HowItWorks';
import { Reviews } from '@/components/Reviews';
import { PaymentErrorModal } from '@/components/PaymentErrorModal';
import ExampleCode from '@/components/ExampleCode';
import AnnouncementBar from '@/components/AnnouncementBar';

export default async function ProductPage({ params }: { params: { handle: string } }) {    
    const product = await getHandleOfProduct(params.handle);
    
    if(!product) {
        redirect('/')
    }
    const bundle = await getProductById(product?.metafield?.value ?? "");

    return (
        <div className='relative'>
            <div className="sticky top-0 w-full z-50">
                <StickyBar />
                <NavBar />
            </div>

            <div className="max-w-screen-xl mx-auto w-full">
                <PaymentErrorModal />
            </div>

            {/* <div className="z-[100] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-20 lg:p-32 bg-background rounded-lg shadow-lg">
                    <p className="font-bold uppercase text-foreground">En cours de progression...</p>
                </div>
            </div>
            <div className='blur-xl pointer-events-none'>
            </div> */}
                <div>
                    <section className={cn(
                        "w-full text-left mx-auto", 
                        "lg:grid lg:grid-cols-2"
                    )}>
                        <div className='lg:flex lg:justify-center xl:pl-40 bg-secondary/30 dark:bg-[#324e58] lg:h-screen lg:sticky lg:top-24'>
                            <ImagesGallery
                                images={product?.images.edges ?? []}
                            />
                        </div>
                        <div className={cn("px-4", "lg:pl-10", "xl:pl-20")}>
                            <ProductImage product={product!} bundle={bundle} />
                        </div>
                    </section>
                </div>
                <ExampleStore />
                <AnnouncementBar />
                <ExampleCode />
                <HowItWorks />
                <Reviews />
                <FAQ />
                <Footer />
               {/*  <Discord /> */}
            {/* <PurchasePopup /> */}
        </div>
    );
};