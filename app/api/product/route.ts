import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) return NextResponse.error()

        if(currentUser.role !== "ADMIN"){
            return NextResponse.error()
        }

        const body = await request.json();
        const { name, description, price, brand, category, inStock, images } = body;

        // Ensure all required fields are present
        if (!name || !description || !price || !brand || !category || typeof inStock === 'undefined' || !images) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                category,
                inStock,
                images,
                price: parseFloat(price),
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}




export async function PUT(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return NextResponse.error()
    }

    const body = await request.json()
    const {id, inStock} = body

    const product = await prisma.product.update({
        where: {id: id},
        data: {inStock}
    })

    return NextResponse.json(product)
}

