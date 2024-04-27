import axios, { AxiosRequestConfig } from 'axios';
import { Account } from '@prisma/client';
import { TCarousel } from '@/types/types';

type IData = {
    id: string;
};
type ResData = {
    data: IData;
    status: number;
};

type TUploadRegisterResponse = {
    data: {
        value: {
            uploadUrl: string;
            document: string;
        };
    };
};

/**
 * This function gets the url to upload an doc to LinkedIn
 */
export const registerUploadImageToLinkedin = async (
    providerAccountId: String | undefined,
    accessToken: String | null | undefined
) => {
    const registerUploadUrl =
        'https://api.linkedin.com/v2/assets?action=registerUpload';

    const registerUploadBody = {
        registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${providerAccountId}`,
            serviceRelationships: [
                {
                    relationshipType: 'OWNER',
                    identifier: 'urn:li:userGeneratedContent',
                },
            ],
        },
    };

    const config = {
        method: 'post',
        url: registerUploadUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            'X-Restli-Protocol-Version': '2.0.0',
        },
        data: JSON.stringify(registerUploadBody),
    };

    let res: TUploadRegisterResponse;

    try {
        res = await axios(config);
    } catch (error) {
        console.error('Error registering document to LinkedIn:');
        throw error;
    }

    return {
        uploadUrl: res.data.value.uploadUrl,
        asset: res.data.value.document,
    };
};

/**
 * This function gets the url to upload a doc to LinkedIn
 */
export const registerUploadDocumentToLinkedin = async (
    providerAccountId: String | undefined,
    accessToken: String | null | undefined
) => {
    const registerUploadUrl =
        'https://api.linkedin.com/rest/documents?action=initializeUpload';

    const registerUploadBody = {
        initializeUploadRequest: {
            owner: `urn:li:person:${providerAccountId}`,
        },
    };

    const config = {
        method: 'post',
        url: registerUploadUrl,
        headers: {
            'LinkedIn-Version': '202403',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            // Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            // 'X-Restli-Protocol-Version': '2.0.0',
        },
        data: JSON.stringify(registerUploadBody),
    };

    let res: TUploadRegisterResponse;
    try {
        res = await axios(config);
        console.log('registering RES', res);
    } catch (error) {
        console.error('Error registering document to LinkedIn:');
        throw error;
    }

    return {
        uploadUrl: res.data.value.uploadUrl,
        asset: res.data.value.document,
    };
};

/**
 * This fn actually uploads the document to LinkedIn
 */
export const uploadAssetToLinkedin = async (
    uploadUrl: string,
    assetUrl: string,
    accessToken: String | null | undefined
) => {
    let imageData;

    try {
        const response = await axios.get(assetUrl, {
            responseType: 'arraybuffer', // This ensures the data is returned as Buffer
        });

        imageData = response.data;
    } catch (error) {
        console.error(
            'Unable to retrieve image data from the provided URL ##1'
        );
        throw error;
    }

    // Upload the image data to LinkedIn
    const config = {
        method: 'post',
        url: uploadUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/octet-stream',
            Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            'X-Restli-Protocol-Version': '2.0.0',
        },
        data: imageData,
    };

    try {
        const res = await axios(config);
        console.log('Image uploaded to LinkedIn!:', res.status);
        return res.status;
    } catch (error) {
        console.error('Unable to upload image to LinkedIn. ##2');
        throw error;
    }
};

/*
 * Publish a post (with or without asset - image, doc) on LinkedIn
 */
export const postOnLinkedIn = async (
    providerAccountId: String | undefined,
    content: String | null | undefined,
    accessToken: String | null | undefined,
    title: string,
    asset?: string
): Promise<ResData> => {
    try {
        const body = {
            author: `urn:li:person:${providerAccountId}`,
            commentary: `${content}`.replace(
                /[\(*\)\[\]\{\}<>@|~_]/gm,
                (x) => '\\' + x
            ),
            visibility: 'PUBLIC',
            distribution: {
                feedDistribution: 'MAIN_FEED',
                targetEntities: [],
                thirdPartyDistributionChannels: [],
            },
            content: asset
                ? {
                      media: {
                          title: title || 'Documento sin título',
                          id: asset,
                      },
                  }
                : undefined,

            lifecycleState: 'PUBLISHED',
            isReshareDisabledByAuthor: false,
        };

        console.log(
            '*LOG - postOnLinkedin - body before config',
            body.content?.media
        );

        const config: AxiosRequestConfig<any> = {
            method: 'post',
            url: 'https://api.linkedin.com/rest/posts', // REVIEW: why is not the url on the .env file?
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202403',
            },
            data: JSON.stringify(body),
        };

        console.log('LOG - postOnLinkedin - body RIGHT before the call', {
            body,
        });

        const response = await axios(config);

        // console.log('LOG - postOnLinkedin - response', { response.data });

        return response;
    } catch (error: any) {
        console.error('Error posting on LinkedIn ***:');
        console.error(error);
        throw error;
    }
};

export const registerAndUploadDocumentToLinkedin = async (
    carousel: TCarousel,
    userAccount: Account
) => {
    let asset = undefined as undefined | string;

    if (carousel?.pdfUrl) {
        console.log('Registering document to linkedin');
        const documentRegister = await registerUploadDocumentToLinkedin(
            userAccount?.providerAccountId,
            userAccount?.access_token
        );

        const { uploadUrl } = documentRegister;
        asset = documentRegister.asset;

        console.log('Uploading document to linkedin');
        await uploadAssetToLinkedin(
            uploadUrl,
            carousel?.pdfUrl!,
            userAccount?.access_token
        );
    }
    console.log('Posting on linkedin');

    return asset;
};
