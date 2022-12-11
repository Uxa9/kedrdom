import type { AppProps } from 'next/app'
import { Tenor_Sans } from '@next/font/google';
import '../styles/globals.css';
import React from 'react';

const font = Tenor_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const MobileMenuContext = React.createContext({
    isOpen: false
});

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MobileMenuContext.Provider value={{isOpen: false}}>
            <div className={font.className}>
            <Component {...pageProps} />
            </div>
        </MobileMenuContext.Provider>
    )
}