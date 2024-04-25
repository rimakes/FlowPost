type SlideBackgroundProps = {
    imageUrl: string;
    opacity?: number;
};
export function SlideBackground({ imageUrl, opacity }: SlideBackgroundProps) {
    return (
        <div
            className='absolute left-0 top-0 h-full w-full opacity-60'
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity,
            }}
        />
    );
}
