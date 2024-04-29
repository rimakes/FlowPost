// TODO: This is not used. It's just for my reference.

import { NextRequest, NextResponse } from 'next/server';

export type NextFunction = () => void;
export type Middleware = (
    request: NextRequest,
    next: NextFunction
) => Promise<NextResponse | void>;

export const withMiddlewares =
    (...middleware: Middleware[]) =>
    async (request: NextRequest) => {
        let response: NextResponse | void = undefined;

        for (let i = 0; i < middleware.length; i++) {
            let nextInvoked = false;
            const next = async () => {
                nextInvoked = true;
            };

            response = await middleware[i](request, next);

            if (!nextInvoked) break; // If a middleware doesn't call next(), we should have a response (or one middleware sent it, or we reach the end of the chain - the handler, or an error occurred)
        }

        if (!(response instanceof NextResponse)) {
            throw new Error(
                'Your handler or middleware must return a NextResponse!'
            );
        }
        if (response) return response;
    };
