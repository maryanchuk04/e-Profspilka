import { definePreset } from "@primeng/themes";
import Aura from '@primeng/themes/aura';

export const eProfspilkaPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '#e6e9fe',
            100: '#c3c8fd',
            200: '#9ca3fc',
            300: '#707afc',
            400: '#4250fa',
            500: '#0026F3', // main color
            600: '#001fd0',
            700: '#0018a3',
            800: '#001077',
            900: '#00064b',
            950: '#000229'
        }
    }
});
