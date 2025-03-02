"use client";

import type { Product } from "@/app/products/page";
import Rating from "@/components/rating";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useParams,useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux/store";

const Product = () => {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.count);


    useEffect(() => {
        const fetchProductById = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) throw new Error("Failed to fetch product");
                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductById();
        }
    }, [id]);

    if (loading) {
        return <div className="mt-16 text-center">Loading product...</div>;
    }

    if (!product) {
        return <div className="mt-16 text-center">Product not found</div>;
    }

    return (
        <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 py-6">
             <ToastContainer />
            <div className="mx-24">
            <ChevronLeft 
            onClick={()=>router.push('/products') }
            />
            </div>
            <div className="flex flex-col px-10 gap-6 items-center justify-center">
        
                <div className="w-full mb-16 flex items-center justify-center">
                    <Image
                        src={product.thumbnail || "/default-thumbnail.jpg"}
                        width={400}
                        height={320}
                        alt="product"
                        className="w-full max-w-xs h-[280px] object-cover rounded-lg shadow-md"
                    />
                </div>

  
                <div className="w-full md:w-1/2 px-2 sm:px-6">
                    <div className="relative">
                        <Title title={product.title} description={product.description} truncate={false} />
                        <Rating rating={product.rating} className="absolute top-0 right-0" />
                    </div>
                    <div className="flex flex-row sm:flex-row justify-between items-center mt-6">
                
                        <div className="flex items-center gap-3">
                            <MinusCircle
                                color={count === 0 ? "#B0B0B0" : "#696969"}
                                className="cursor-pointer w-5 h-5 sm:w-8 sm:h-8"
                                onClick={() => dispatch(setCount(Math.max(0, count - 1)))}
                            />
                            <span className="text-lg font-semibold">{count}</span>
                            <PlusCircle
                                color="#F9D03F"
                                className="cursor-pointer w-5 h-5 sm:w-8 sm:h-8"
                                onClick={() => dispatch(setCount(count + 1))}
                            />
                        </div>
                        <h1 className="text-xl mt-3 ">$ {product.price.toFixed(1)}</h1>
                    </div>


                    <div className="mt-12">
                        <Button className="w-full py-3 sm:py-4 text-lg sm:text-xl" onClick={()=> toast.success('Added to Card Successfully')}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
