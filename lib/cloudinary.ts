'use server';

import { appConfig } from '@/config/shipper.appconfig';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

export const uploadFileToCloudinary = async (
    formData: FormData
): Promise<{
    url: string;
    publicId: string;
}> => {
    cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const promise = new Promise(async (resolve, reject) => {
        // Create a stream to upload the file to Cloudinary
        let cloudinaryStream = cloudinary.v2.uploader.upload_stream(
            { folder: `${appConfig.general.appName}` }, // Optional: specify a folder in Cloudinary
            (error, result) => {
                if (result) {
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    }); // Resolve with the URL of the uploaded image
                }
                reject(error);
            }
        );
        // Get the file from the form data and convert it to an arrayBuffer (arrayBuffer= frontend, buffer= backend)
        const file = formData.get('file') as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // streamify the buffer and pipe it to the cloudinary stream. The fs module only allows to streamify files, but we can use the streamifier package to streamify buffers so we don't have to save the file to the disk
        const fileStream = streamifier.createReadStream(buffer);
        fileStream.pipe(cloudinaryStream);
    });

    let result;
    try {
        result = await promise;
    } catch (error) {
        // @ts-ignore
    }

    return result as Promise<{ url: string; publicId: string }>;
};

export const getPageNFromCloudinary = async (imageId: string, n: number) => {
    cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const image = cloudinary.v2.api.resource(
        imageId,
        {
            transformation: [
                { page: n },
                {
                    width: 300,
                    height: 300,
                },
                { format: 'jpg' },
            ],
        },
        (error, result) => {}
    );

    return image;
};
