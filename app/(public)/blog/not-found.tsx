import { NotFoundComp } from '@/components/shared/NotFound';

export default function NotFound() {
    return (
        <NotFoundComp url='/blog' label='Ir al blog'>
            <p>¡Ups! Parece que esta página no existe.</p>
        </NotFoundComp>
    );
}
