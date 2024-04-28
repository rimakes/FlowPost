import axios, { AxiosError } from 'axios';

export const getPexelImages = async (query: string) => {
    console.log('query', query);

    try {
        const pictures = await axios.get(
            `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=20&locale=es-ES`,
            {
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
                },
            }
        );
        const photoUrls = pictures.data.photos.map((photo: any) => {
            return photo.src.medium;
        });
        return photoUrls;
    } catch (error: any) {
        console.error('Error fetching images from Pexels', error);
        if (error!.name === 'AxiosError') {
            const axiosError = error as AxiosError;
            console.error(
                'Error fetching images from Pexels - REQUEST: ',
                axiosError.request
            );
            console.error('CONFIG: ', axiosError.config);
        }
        throw error;
    }
};
