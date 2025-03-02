"use client"
import Price from '@/components/price';
import Rating from '@/components/rating';
import Title from '@/components/title';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export interface Product {
    title: string;
    price: number;
    rating: number;
    id: number;
    category: string;
    thumbnail: string;
    description: string;
}





const Products = () => {
    const [active, setActive] = useState<number>(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [menuButtons, setMenuButtons] = useState<string[]>(["ALL"]);
    const [page, setPage] = useState<number>(1);
    const loader = useRef<HTMLDivElement | null>(null);

    const router = useRouter();

    async function fetchAllProducts(limit: number, skip: number) {
        try {
            const filterValue = menuButtons[active];
            console.log(filterValue);
            const productsAPI = await fetch(`https://dummyjson.com/products/${filterValue==="ALL"?'':`category/${filterValue.toLowerCase()}`}?limit=${limit}&skip=${skip}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const products = await productsAPI.json();
            setProducts(prevProducts => [...prevProducts, ...products.products]);
            console.log(products);
            const categoryAPI = await fetch('https://dummyjson.com/products/category-list', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const category = await categoryAPI.json();
            setMenuButtons(["ALL", ...category]);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAllProducts(10, 0);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => {
                    const newSkip = prevPage * 10;
                    fetchAllProducts(10, newSkip);
                    return prevPage + 1;
                });
            }
        }, { threshold: 1.0 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    const handleFilter = async (index: number) => {
        setActive(index)
        if (index == 0) {
            fetchAllProducts(10, 0)
        }
        const filterType: string = menuButtons[index];
        const filteredProducts: Product[] = products.filter((product: Product) => product.category === filterType);
        console.log(filteredProducts);
        if (filteredProducts.length == 0) {
            try {
                const categoricalAPI = await fetch(`https://dummyjson.com/products/category/${filterType.toLowerCase()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                const products = await categoricalAPI.json();
                setProducts(products.products);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            setProducts(filteredProducts);
        }
    }

    return (
        <div className='mt-16 max-w-7xl mx-auto px-4 sm:px-6 py-6'>
            <header>
                <h1 className='text-2xl sm:text-4xl'>Product List</h1>
            </header>

            <div className='flex flex-wrap gap-3 gap-x-2 mt-10'>
                {menuButtons.map((value: string, index: number) => (
                    <Button
                        key={value}
                        onClick={() => handleFilter(index)}
                        className={` rounded-2xl text-sm ${active !== index ? 'bg-inherit  text-[#696969]' : ''}`}
                    >{value}</Button>
                ))}
            </div>

            <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  px-4 sm:px-12">
                {products &&
                    products.map((product: Product) => (
                        <Card key={uuidv4()}
                            onClick={() => router.push(`/product/${product.id}`)}
                            className="h-full w-full sm:w-[250px] bg-[#1F1F1F]">
                            <CardContent

                                className='flex flex-col gap-2 items-center'>
                                <div className='overflow-hidden h-[256px] w-[200px]'>
                                    <Image alt={product.id + ""}
                                        src={product.thumbnail} width={450}
                                        height={300}
                                        className="w-[200px]  h-auto overflow-hidden float-left sm:h-[260px] object-cover rounded-lg " />
                                </div>

                                <Rating rating={product.rating} className='mt-0 mb-2 w-full ' />

                                <Title description={product.description}
                                    title={product.title}
                                    truncate={true}
                                />
                            </CardContent>
                            <CardFooter>
                                <Price price={product.price}
                                />
                            </CardFooter>
                        </Card>
                    ))}
            </div>
            <div ref={loader} className="loader"></div>
        </div>
    )
}

export default Products;