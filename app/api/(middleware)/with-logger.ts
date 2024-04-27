import { PipeFunction } from '@/app/api/(middleware)/with-middleware';

export const withLogger: PipeFunction = async (req, params, next) => {
    console.log('Request received:', req.url);
    return await next();
};
