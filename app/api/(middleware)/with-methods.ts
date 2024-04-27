import { NextRequest, NextResponse } from 'next/server';
import { PipeFunction } from '@/app/api/(middleware)/with-middleware';

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const withMethods =
    (allowedMethods: HttpVerb[]): PipeFunction =>
    async (req: NextRequest, params, next: () => void) => {
        if (allowedMethods.includes(req.method as HttpVerb)) {
            console.log('Method allowed');
            return next();
        } else {
            return NextResponse.json(
                { error: 'Method not allowed' },
                { status: 405 }
            );
        }
    };
