import { NotFoundComp } from '@/components/shared/NotFound';

export default function NotFound() {
    return (
        <NotFoundComp url='/' label='Ir a la Home'>
            <p>¡Ups! Parece que esta página no existe.</p>
        </NotFoundComp>
    );
}
