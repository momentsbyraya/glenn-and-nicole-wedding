// Theme Configuration - Dark blue + dark pink for text
// #1e3a5f dark blue (text, headings) | #B76E79 dark pink (text, accents)
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-burgundy-dark',
        secondary: 'bg-burgundy-wine',
        accent: 'bg-burgundy-wine',
        light: 'bg-white/60',
        theme: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors (dark blue + dark pink)
    text: {
        primary: 'text-burgundy-dark',
        secondary: 'text-burgundy-tan',
        accent: 'text-burgundy-wine',
        muted: 'text-burgundy-tan/80',
        dark: 'text-burgundy-dark',
        theme: 'text-burgundy-wine',
        pause: 'text-[#FFFBFB]',
        custom: 'text-burgundy-dark',
        light: '#B76E79',
        lightBlack: '#1e3a5f',
        cream: '#FFFBFB',
        tan: '#B76E79',
        wine: '#B8D4E8',
        burgundyDark: '#1e3a5f',
        burntOrange: '#1e3a5f',
        darkBlue: '#1e3a5f',
        darkPink: '#B76E79',
    },

    // Border Colors
    borders: {
        primary: 'border-burgundy-wine',
        secondary: 'border-burgundy-tan',
        accent: 'border-burgundy-wine',
        theme: 'border-burgundy-tan',
        garden: 'border-burgundy-tan',
    },

    // Button Colors
    buttons: {
        primary: 'bg-burgundy-wine hover:bg-burgundy-tan',
        secondary: 'border border-burgundy-tan hover:border-burgundy-wine',
        text: 'text-burgundy-cream hover:text-white',
        theme: 'bg-burgundy-wine hover:bg-burgundy-wine/90',
        garden: 'bg-burgundy-tan hover:bg-burgundy-wine',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-burgundy-tan',
        secondary: 'hover:border-burgundy-wine hover:text-burgundy-cream',
        theme: 'hover:bg-burgundy-wine/90',
        garden: 'hover:bg-burgundy-wine',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-05-09',
        highlightColor: 'bg-burgundy-wine',
        heartColor: 'text-burgundy-wine',
        textColor: 'text-burgundy-dark',
        headerColor: 'text-burgundy-wine',
        dayNamesColor: 'text-burgundy-tan',
        background: 'bg-burgundy-cream',
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
    },

    // Custom CSS Variables (dark blue + dark pink for text)
    cssVariables: {
        '--primary-bg': '#1e3a5f',
        '--secondary-bg': '#B8D4E8',
        '--accent-bg': '#B8D4E8',
        '--accent-hover': '#B76E79',
        '--primary-text': '#1e3a5f',
        '--secondary-text': '#B76E79',
        '--accent-text': '#B8D4E8',
        '--muted-text': '#B76E79',
        '--border-color': '#1e3a5f',
        '--custom-theme': '#B8D4E8',
        '--cream': '#FFFBFB',
        '--tan': '#B76E79',
        '--wine': '#B8D4E8',
        '--burgundy-dark': '#1e3a5f',
        '--garden-bg': '#FFFBFB',
        '--blush': '#B76E79',
        '--powder-blue': '#D4E5F4',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-burgundy-dark',
            secondary: 'bg-burgundy-wine',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-cream',
            secondary: 'text-burgundy-tan',
            accent: 'text-burgundy-wine',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    warmAutumn: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-burgundy-tan/30',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    gardenWedding: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
            theme: 'bg-burgundy-cream',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
            garden: 'text-burgundy-tan',
        }
    }
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
