import { GeneralSettingsForm } from '@/app/app/settings/_components/AccountSettings';
import { db } from '@/lib/prisma';
import { ApiResponse, ApiRequestBody } from '@/types/types';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, context: { params: Params }) {
    const { action, data } = (await request.json()) as {
        action: RouteActions;
        data: any;
    };
    let res: SettingsRes<typeof action>;

    switch (action) {
        case 'GENERAL': {
            console.log('data', data);
            const updatedUser = await db.user.update({
                where: { id: context.params.userId as string },
                data: {
                    name: data.name,
                },
            });
            res = {
                ok: true,
                data,
                message: 'User updated',
                statusCode: 200,
            };
            break;
        }
    }

    return NextResponse.json(res, { status: 200 });
}

// Types for the api route
// First we create a map of the actions that the route can perform and their request and response types
type RouteApiMap = {
    GENERAL: {
        reqData: GeneralSettingsForm;
        resData: string;
    };
    // UPDATE: {
    //     reqData: StudioFormValues;
    //     resData: Studio;
    // };
};
// Get the name of the actions
type RouteActions = keyof RouteApiMap;

// the wrap them in a generic type for api response and request
export type SettingsRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type SettingsReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;
