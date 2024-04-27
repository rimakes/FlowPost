import { NextRequest } from 'next/server';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { withMiddleware } from '@/app/api/(middleware)/with-middleware';
import { withCatch } from '@/app/api/(middleware)/with-catch';
import { withLogger } from '@/app/api/(middleware)/with-logger';
import { completeApiHandler } from '@/app/api/complete/complete-api-handler';

export type TCompleteRequest = {
    instructionsId: string;
    description: string;
};

type RouteApiMap = {
    COMPLETE: {
        reqData: TCompleteRequest;
        resData: string;
    };
};

type RouteActions = keyof RouteApiMap;

export type WritterRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type WritterReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;

const handler = async (req: NextRequest) => {
    const body = await req.json();
    const { action }: { action: RouteActions } = body;
    switch (action) {
        case 'COMPLETE':
            return completeApiHandler(body);
    }
};

export const POST = withMiddleware(withLogger, withCatch, handler);
