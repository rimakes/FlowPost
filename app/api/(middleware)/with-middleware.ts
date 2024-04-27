import { StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export function withMiddleware(...pipeFunctions: PipeFunctionOrHandler<any>[]) {
    return async function internalHandler(req: NextRequest, params: Params) {
        return await startPiping(req, params, pipeFunctions, 0);
    };
}

async function startPiping(
    req: NextRequest,
    params: Params,
    pipeFunctions: PipeFunctionOrHandler<any>[],
    currentPipeFunctionIndex: number
) {
    const next: Next = async () => {
        // Get next pipeFunction, if there is one - if there isn't we stop execution
        const nextPipeFunction = pipeFunctions[currentPipeFunctionIndex + 1];
        if (!nextPipeFunction) return;

        // Recursively run next pipeFunction
        return await startPiping(
            req,
            params,
            pipeFunctions,
            currentPipeFunctionIndex + 1
        );
    };

    // Initializes pipeFunction chain - the next function will
    // recursively run next pipeFunction when called by the current pipeFunction
    return await pipeFunctions[currentPipeFunctionIndex](req, params, next);
}

export type Next = () => Promise<NextResponse | StreamingTextResponse | void>;

export type Params = Record<'params', any>;

export type Handler<AdditionalReqProperties = void> = (
    req: NextRequest & AdditionalReqProperties
) => NextResponse | Promise<NextResponse> | Promise<StreamingTextResponse>;

export type HandlerWithParams<AdditionalReqProperties = void> = (
    req: NextRequest & AdditionalReqProperties,
    params: Params
) => NextResponse | Promise<NextResponse>;

export type PipeFunction<AdditionalReqProperties = void> = (
    req: NextRequest & AdditionalReqProperties,
    params: Params | undefined,
    next: Next
) => Promise<NextResponse | StreamingTextResponse | void>;

export type PipeFunctionOrHandler<AdditionalReqProperties> =
    | Handler<AdditionalReqProperties>
    | HandlerWithParams<AdditionalReqProperties>
    | PipeFunction<AdditionalReqProperties>;
