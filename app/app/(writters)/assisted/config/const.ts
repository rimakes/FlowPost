import * as PrismaClient from '@prisma/client';
import { Pure, VoiceTone } from '@/types/types';

export const VOICE_TONES: VoiceTone[] = [
    {
        id: 1,
        emoji: '🤩',
        name: 'Emocionado',
        value: 'emocionado',
    },
    {
        id: 2,
        emoji: '😎',
        name: 'Dramático',
        value: 'dramático',
    },
    {
        id: 3,
        emoji: '🤓',
        name: 'Creativo',
        value: 'creativo',
    },
    {
        id: 4,
        emoji: '🤔',
        name: 'Profesional',
        value: 'Profesional',
    },
    {
        id: 5,
        emoji: '😍',
        name: 'Motivador',
        value: 'motivador',
    },
    {
        id: 6,
        emoji: '😂',
        name: 'Gracioso',
        value: 'gracioso',
    },
    {
        id: 8,
        emoji: '😭',
        name: 'Casual',
        value: 'casual',
    },
    {
        id: 9,
        emoji: '😱',
        name: 'Convincente',
        value: 'convincente',
    },
    {
        id: 10,
        emoji: '🤯',
        name: 'Sorprendente',
        value: 'sorprendente',
    },
    {
        id: 11,
        emoji: '⌛',
        name: 'Urgente',
        value: 'urgente',
    },
    {
        id: 12,
        emoji: '😟',
        name: 'Preocupado',
        value: 'preocupado',
    },
    {
        id: 13,
        emoji: '😮',
        name: 'Informativo',
        value: 'informativo',
    },
    {
        id: 14,
        emoji: '😠',
        name: 'Enfadado',
        value: 'enfadado',
    },
    {
        id: 15,
        emoji: '👩‍🏫',
        name: 'Didáctico',
        value: 'didactico',
    },
];

export const POST_CATEGORIES: Pure<PrismaClient.PostCategory>[] = [
    {
        id: '0',
        name: 'todos',
        tags: [``],
        description: '',
    },
    {
        id: '1',
        name: 'aprendizajes',
        tags: ['aprendizajes', 'conclusiones', 'lecciones', 'tips'],
        description: '',
    },
    {
        id: '2',
        name: 'consejos',
        tags: ['consejos', 'tips', 'ideas'],
        description: '',
    },
    {
        id: '3',
        name: 'historias',
        tags: ['historias', 'experiencias'],
        description: '',
    },
    {
        id: '4',
        name: 'opiniones',
        tags: ['opiniones', 'reflexiones', 'ideas'],
        description: '',
    },

    {
        id: '5',
        name: 'conclusiones',
        tags: ['conclusiones', 'lecciones', 'tips'],
        description: '',
    },
    {
        id: '6',
        name: 'lecciones',
        tags: ['lecciones', 'tips'],
        description: '',
    },
    {
        id: '7',
        name: 'tips',
        tags: ['tips'],
        description: '',
    },
    {
        id: '8',
        name: 'ideas',
        tags: ['ideas'],
        description: '',
    },
    {
        id: '9',
        name: 'experiencias',
        tags: ['experiencias'],
        description: '',
    },
    {
        id: '10',
        name: 'reflexiones',
        tags: ['reflexiones'],
        description: '',
    },
] as const;
export const COLOR_PALETTES = [
    {
        font: '#146C94', // Deep teal
        background: '#F6F1F1', // Soft white
        accent: '#19A7CE', // Vibrant cyan
        primary: '#AFD3E2', // Light blue-gray
        explanation:
            'A calming and serene palette with cool tones, perfect for wellness or tranquility themes.',
        id: 1,
    },
    {
        font: '#212121', // Deep charcoal
        background: '#FAFAFA', // Bright white
        accent: '#F44336', // Bright red
        primary: '#FFC107', // Warm amber
        explanation:
            'A bold palette with warm tones and high contrast, suitable for energetic and modern designs.',
        id: 2,
    },
    {
        font: '#00274D', // Deep navy blue
        background: '#E8F1F5', // Light sky blue
        accent: '#FFB90F', // Golden yellow
        primary: '#01786F', // Dark teal-green
        explanation:
            'A nautical-themed palette with deep blues and contrasting golden yellow, great for maritime or outdoor themes.',
        id: 3,
    },
    {
        font: '#3D3D3D', // Dark gray
        background: '#FFF8E1', // Light cream
        accent: '#FF7043', // Coral orange
        primary: '#FFB74D', // Soft amber
        explanation:
            'A warm and welcoming palette with earthy tones, ideal for projects with a vintage or rustic feel.',
        id: 4,
    },
    {
        font: '#333333', // Deep black
        background: '#FFFFFF', // Pure white
        accent: '#E91E63', // Bright pink
        primary: '#9C27B0', // Rich purple
        explanation:
            'A vibrant and lively palette with high energy, suitable for modern, playful themes.',
        id: 5,
    },
    {
        font: '#2C3E50', // Dark navy gray
        background: '#ECF0F1', // Light gray
        accent: '#3498DB', // Bright blue
        primary: '#2ECC71', // Bright green
        explanation:
            'A fresh palette with a mix of cool tones, suitable for tech or environmental projects.',
        id: 6,
    },
    {
        font: '#4A235A', // Deep purple
        background: '#FDEDEC', // Soft blush pink
        accent: '#EC7063', // Warm red
        primary: '#F5B7B1', // Light rose pink
        explanation:
            'A romantic palette with a gentle and inviting feel, ideal for projects related to love or celebration.',
        id: 7,
    },
    {
        font: '#34495E', // Dark gray-blue
        background: '#F2F3F4', // Soft gray-white
        accent: '#E74C3C', // Bright red
        primary: '#8E44AD', // Deep purple
        explanation:
            'A sophisticated palette with bold contrasts, ideal for projects requiring strong visual impact.',
        id: 8,
    },
    {
        font: '#1C2833', // Deep blue-black
        background: '#F7F9F9', // Light blue-gray
        accent: '#F4D03F', // Bright yellow
        primary: '#1ABC9C', // Vibrant teal
        explanation:
            'A bright and cheerful palette with playful elements, great for tech or creative designs.',
        id: 9,
    },
    {
        font: '#6A1B9A', // Deep violet
        background: '#EDE7F6', // Light lavender
        accent: '#BA68C8', // Medium purple
        primary: '#7B1FA2', // Rich purple
        explanation:
            'A monochromatic purple palette with various shades, ideal for artistic and creative projects.',
        id: 10,
    },
    {
        font: '#004D40', // Dark teal-green
        background: '#E0F2F1', // Soft mint green
        accent: '#26A69A', // Vibrant teal
        primary: '#80CBC4', // Light teal
        explanation:
            'An analogous green palette with soothing tones, perfect for eco-friendly or nature-focused designs.',
        id: 11,
    },
    {
        font: '#BF360C', // Dark reddish-brown
        background: '#FFEBEE', // Soft pink
        accent: '#F44336', // Bright red
        primary: '#E57373', // Light red
        explanation:
            'A complementary palette with warm tones, suitable for bold and dramatic designs.',
        id: 12,
    },
    {
        font: '#263238', // Dark slate gray
        background: '#ECEFF1', // Light gray
        accent: '#FF6F00', // Bright orange
        primary: '#FFA000', // Rich amber
        explanation:
            'A contrasting palette with gray and orange tones, ideal for energetic and modern themes.',
        id: 13,
    },
    {
        font: '#1B5E20', // Deep forest green
        background: '#E8F5E9', // Light mint green
        accent: '#43A047', // Medium green
        primary: '#388E3C', // Dark green
        explanation:
            'An analogous palette with various greens, ideal for projects with a focus on sustainability or nature.',
        id: 14,
    },
    {
        font: '#01579B', // Deep blue
        background: '#E1F5FE', // Soft sky blue
        accent: '#03A9F4', // Bright blue
        primary: '#0288D1', // Medium blue
        explanation:
            'A monochromatic blue palette with different shades, perfect for technology or business projects.',
        id: 15,
    },
    {
        font: '#3E2723', // Dark brown
        background: '#FFEB3B', // Bright yellow
        accent: '#FF9800', // Vibrant orange
        primary: '#F57C00', // Deep orange
        explanation:
            'A triadic palette with a mix of brown, yellow, and orange, suitable for projects with a bold and vibrant feel.',
        id: 16,
    },
    {
        font: '#212121', // Dark charcoal
        background: '#FAFAFA', // Soft white
        accent: '#009688', // Bright teal
        primary: '#4CAF50', // Medium green
        explanation:
            'A harmonious palette with complementary green and teal, ideal for projects requiring balance and calm.',
        id: 17,
    },
    {
        font: '#5D4037', // Dark chocolate brown
        background: '#FFCDD2', // Soft pink
        accent: '#FF8A80', // Bright pink-red
        primary: '#E57373', // Light red
        explanation:
            'A warm palette with earthy and pink tones, ideal for projects focusing on love or creativity.',
        id: 18,
    },
    {
        font: '#311B92', // Deep purple
        background: '#EDE7F6', // Soft lavender
        accent: '#7E57C2', // Medium purple
        primary: '#512DA8', // Dark purple
        explanation:
            'A monochromatic purple palette with various shades, great for artistic or creative themes.',
        id: 19,
    },
    {
        font: '#283593', // Deep blue
        background: '#E8EAF6', // Soft blue-gray
        accent: '#3F51B5', // Medium blue
        primary: '#5C6BC0', // Dark blue
        explanation:
            'A triadic blue palette with complementary shades, ideal for technology or business themes.',
        id: 20,
    },
    {
        font: '#F57F17', // Deep yellow-orange
        background: '#FFFDE7', // Soft cream
        accent: '#FFCA28', // Bright yellow-orange
        primary: '#FFB300', // Medium amber
        explanation:
            'An analogous palette with warm orange and yellow tones, ideal for energetic and lively themes.',
        id: 21,
    },
    {
        font: '#01579B', // Deep blue
        background: '#E1F5FE', // Light blue
        accent: '#03A9F4', // Bright blue
        primary: '#0288D1', // Medium blue
        explanation:
            'A monochromatic blue palette with varying intensities, great for technology or corporate projects.',
        id: 22,
    },
    {
        font: '#424242', // Dark gray
        background: '#F5F5F5', // Light gray
        accent: '#FFC107', // Bright yellow
        primary: '#FF9800', // Deep orange
        explanation:
            'A contrasting palette with gray and orange tones, suitable for energetic and vibrant themes.',
        id: 23,
    },
    {
        font: '#2E7D32', // Deep forest green
        background: '#E8F5E9', // Light mint green
        accent: '#388E3C', // Medium green
        primary: '#1B5E20', // Dark green
        explanation:
            'An analogous green palette with a range of shades, perfect for eco-friendly or nature-focused projects.',
        id: 24,
    },
    {
        font: '#1B2631', // Deep blue-black
        background: '#F8F9F9', // Light gray
        accent: '#3498DB', // Bright blue
        primary: '#2ECC71', // Vibrant green
        explanation:
            'A high-energy palette with contrasting colors, ideal for tech or modern themes.',
        id: 25,
    },
    {
        font: '#880E4F', // Deep magenta
        background: '#FCE4EC', // Soft pink
        accent: '#D81B60', // Bright magenta
        primary: '#EC407A', // Vibrant pink
        explanation:
            'A monochromatic pink palette with varying shades, ideal for artistic or romantic projects.',
        id: 26,
    },
    {
        font: '#01579B', // Deep blue
        background: '#E1F5FE', // Light blue
        accent: '#03A9F4', // Vibrant blue
        primary: '#0288D1', // Medium blue
        explanation:
            'A monochromatic blue palette with different intensities, suitable for technology or business projects.',
        id: 27,
    },
    {
        font: '#283593', // Deep blue
        background: '#E8EAF6', // Light blue-gray
        accent: '#3F51B5', // Medium blue
        primary: '#5C6BC0', // Dark blue
        explanation:
            'A triadic blue palette with complementary shades, ideal for technology or business themes.',
        id: 28,
    },
    {
        font: '#F57F17', // Deep yellow-orange
        background: '#FFFDE7', // Light cream
        accent: '#FFC107', // Bright yellow-orange
        primary: '#FFB300', // Deep amber
        explanation:
            'An analogous palette with a mix of warm orange and yellow tones, ideal for energetic themes.',
        id: 29,
    },
    {
        font: '#263238', // Dark slate gray
        background: '#ECEFF1', // Light gray
        accent: '#FF6F00', // Bright orange
        primary: '#FFA000', // Rich amber
        explanation:
            'A contrasting palette with gray and orange tones, suitable for vibrant and energetic themes.',
        id: 30,
    },
];
