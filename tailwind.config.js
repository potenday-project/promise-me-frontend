/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard-Regular'],
      },
      fontSize: {
        headline1: ['1.5rem', {
          fontWeight: 'Bold',
          lineHeight: '2.25rem',
        }],
        headline2: ['1.25rem', {
          fontWeight: 'Bold',
          lineHeight: '1.875rem',
        }],
        headline3: ['1.125rem', {
          fontWeight: 'Bold',
          lineHeight: '1.6875rem',
        }],
        headline4: ['1rem', {
          fontWeight: 'Bold',
          lineHeight: '1.5rem',
        }],
        headline5: ['0.875rem', {
          fontWeight: 'Bold',
          lineHeight: '1.3125rem',
        }],
        title1: ['1.5rem', {
          fontWeight: 'Medium',
          lineHeight: '2.25rem',
        }],
        title2: ['1.25rem', {
          fontWeight: 'Medium',
          lineHeight: '1.875rem',
        }],
        title3: ['1.125rem', {
          fontWeight: 'Medium',
          lineHeight: '1.6875rem',
        }],
        title4: ['1rem', {
          fontWeight: 'Medium',
          lineHeight: '1.5rem',
        }],
        title5: ['0.875rem', {
          fontWeight: 'Medium',
          lineHeight: '1.3125rem',
        }],
        title6: ['0.75rem', {
          fontWeight: 'Medium',
          lineHeight: '1.125rem',
        }],
        body1: ['1.25rem', {
          fontWeight: 'Regular',
          lineHeight: '1.875rem',
        }],
        body2: ['1.125rem', {
          fontWeight: 'Regular',
          lineHeight: '1.6875rem',
        }],
        body3: ['1rem', {
          fontWeight: 'Regular',
          lineHeight: '1.5rem',
        }],
        body4: ['0.875rem', {
          fontWeight: 'Regular',
          lineHeight: '1.3125rem',
        }],
        body5: ['0.75rem', {
          fontWeight: 'Regular',
          lineHeight: '1.125rem',
        }],
        body6: ['0.625rem', {
          fontWeight: 'Regular',
          lineHeight: '0.9375rem',
        }],        
      },
      colors: {
        '--primary-blue900': '#081E3F',
        '--primary-blue800': '#0E346C',
        '--primary-blue700': '#144A9A',
        '--primary-blue600': '#1A60C7',
        '--primary-blue500': '#2F79E4',
        '--primary-blue400': '#5C96EA',
        '--primary-blue300': '#8AB3F0',
        '--primary-blue200': '#B7D0F6',
        '--primary-blue100': '#CDDFF9',
        '--primary-blue50': '#E4EDFB',
        '--grey900': '#191F28',
        '--grey800': '#333D4B',
        '--grey700': '#4E5968',
        '--grey600': '#6B7684',
        '--grey500': '#8B95A1',
        '--grey400': '#B0B8C1',
        '--grey300': '#D1D6DB',
        '--grey200': '#E5E8EB',
        '--grey100': '#F2F4F6',
        '--grey50': '#F9FAFB',
        '--system-black': '#121212',
        '--system-success': '#009E79',
        '--system-white': '#FFFFFF',
        '--system-danger': '#F5535E',
        '--system-warning': '#FF6700',
      },
    },
  },
  plugins: [],
};