import { SubContent } from '@radix-ui/react-dropdown-menu';
import { backgroundPatterns, testo } from './background-patterns';
import {
    GenerateBreakpointsParams,
    generateBreakpoints,
} from './lib/twbreaks-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            backgroundImage: {
                // It's not a pattern what we need, it's a "design" component!
                topo: backgroundPatterns.topo,
                squares: backgroundPatterns.squares,
                things: backgroundPatterns.things,
                pattern: backgroundPatterns.pattern,
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                    background: 'hsl(var(--info-background))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                    background: 'hsl(var(--success-background))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                'slide-left': {
                    from: { transform: 'translateX(0%)' },
                    to: { transform: 'translateX(-100%)' },
                },
                'slide-right': {
                    from: { transform: 'translateX(-5%)' },
                    to: { transform: 'translateX(5%)' },
                },
                slide: {
                    // translate: 0% calc(calc((var(--index) + var(--outset, 0)) * -100%));
                    '100%': {
                        translate:
                            '0% calc(calc((var(--index) + var(--outset, 0)) * -100%))',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'slide-left': 'slide-left 20s linear infinite',
                'slide-right': 'slide-right 2s ease-in-out alternate infinite',
                slide: 'slide var(--duration) var(--delay) infinite linear',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        ({ addBase, theme }: GenerateBreakpointsParams) =>
            generateBreakpoints({ addBase, theme }),
    ],
};
