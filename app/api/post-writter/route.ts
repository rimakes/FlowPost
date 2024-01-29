import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { register } from '@/actions/register-user';
import { User } from '@prisma/client';
import { RegisterFormValues } from '@/schemas/auth-schemas';
import { wait } from '@/lib/utils';
import {
    CustomFormSchema,
    PostRequest,
} from '@/app/app/post-writter/_components/PostWritterForm';
import { z } from 'zod';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;

        console.log({ action });

        switch (action) {
            case 'WRITE':
                const {
                    data: { description, templateId, toneId },
                }: WritterReq<'WRITE'> = body;

                if (!description || !templateId || !toneId) {
                    console.log(description, templateId, toneId);
                    console.log('MISSING_DATA');
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                const res: WritterRes<'WRITE'> = {
                    data: 'HELLO THERE!',
                    ok: true,
                    message: 'Usuario creado correctamente',
                    statusCode: 201,
                };

                return NextResponse.json(res, { status: 201 });
        }
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

type RouteApiMap = {
    WRITE: {
        reqData: PostRequest;
        resData: string;
    };
    // UPDATE: {
    //     reqData: StudioFormValues;
    //     resData: Studio;
    // };
};

type RouteActions = keyof RouteApiMap;

export type WritterRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type WritterReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;
