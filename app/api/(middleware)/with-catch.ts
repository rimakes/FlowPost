import { NextResponse } from 'next/server';
import { PipeFunction } from '@/app/api/(middleware)/with-middleware';

export const withCatch: PipeFunction = async (req, params, next) => {
    try {
        return await next();
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error!' }, { status: 500 });
    }
};
