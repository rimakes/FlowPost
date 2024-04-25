'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Search, Sparkles, Upload } from 'lucide-react';
import { ImageGenerator } from './ImageGenerator';
import { ImageUpload } from './ImageUpload';
import { ImageSearchOnline } from './ImageSearchOnline';

type ImageSelectProps = {
    // query: string;
    // setPhotoUrls: (urls: string[]) => void;
    onImageSelect: (url: string) => void;
};
export function ImageSelect({
    // query,
    // setPhotoUrls,
    onImageSelect: onImageSelectProp,
}: ImageSelectProps) {
    const [selectedTab, setSelectedTab] = useState<string>();

    const onImageSelect = (url: string) => {
        setSelectedTab('search'); //TODO: For now, we set up to search so the others update their state
        onImageSelectProp(url);
    };

    return (
        <>
            <Tabs
                defaultValue='search'
                value={selectedTab}
                onValueChange={setSelectedTab}
            >
                <TabsList className='flex w-full justify-between gap-2'>
                    <TabsTrigger value='search' className='flex flex-1 gap-1'>
                        <Search size={12} />
                        <h1>Buscar</h1>
                    </TabsTrigger>
                    <TabsTrigger
                        value='create'
                        className='flex flex-1 gap-1'
                        onMouseDown={(ev) => {
                            // ev.preventDefault();
                        }}
                    >
                        <Sparkles size={12} />
                        <h1>Crear (IA)</h1>
                    </TabsTrigger>
                    <TabsTrigger value='upload' className='flex flex-1 gap-1'>
                        <Upload size={12} />
                        <h1>Subir</h1>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='search'>
                    <ImageSearchOnline onImageSelect={onImageSelect} />
                </TabsContent>
                <TabsContent value='create'>
                    <ImageGenerator onImageSelect={onImageSelect} />
                </TabsContent>
                <TabsContent value='upload'>
                    <ImageUpload onImageSelect={onImageSelect} />
                </TabsContent>
            </Tabs>
        </>
    );
}
