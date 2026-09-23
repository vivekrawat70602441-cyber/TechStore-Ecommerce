
import { notFound } from "next/navigation";

import ProductGallery from "@/components/product-details/ProductGallery";
import Container from "@/components/common/Container";
import ProductInfo from "@/components/product-details/ProductInfo";
import ProductActions from "@/components/product-details/ProductActions";
import ProductTabs from "@/components/product-details/ProductTabs";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Product } from "@/types/product";
import FadeLeft from "@/components/animations/FadeLeft";
import FadeRight from "@/components/animations/FadeRight";


interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductDetailsPage({ params }: Props) {
    const { slug } = await params;

    let product: Product;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            notFound();
        }

        product = await response.json();

    } catch (error) {
        console.error(error);
        notFound();
    }

    return (
        <main className="pt-20 pb-20">
            <Container>

                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Products", href: "/products" },
                        { label: product.name },
                    ]}
                />

                <div className="grid gap-12 py-10 lg:grid-cols-2 lg:items-start">
                    {/*Left Side */}

                    <FadeLeft>
                        <ProductGallery product={product} />
                    </FadeLeft>

                    {/* Right Side */}
                    <div>

                        <FadeRight>
                            <div>
                                <ProductInfo product={product} />
                                <ProductActions product={product} />
                            </div>
                        </FadeRight>


                    </div>
                </div>

                <ProductTabs product={product} />

                <div className="mt-20">
                    <RelatedProducts product={product} />
                </div>

            </Container>
        </main>
    );
}