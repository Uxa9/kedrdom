import { createContext, useState } from "react";

export const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
    const [header, setHeader]       = useState("");
    const [subheader, setSubheader] = useState("");
    const [canGoBack, setCanGoBack] = useState(false);

    const switchHeader = (newHeader, newSubheader, goBack) => {
        setHeader(newHeader);
        setSubheader(newSubheader);
        setCanGoBack(goBack);
    }

    const value = { header, subheader, canGoBack, switchHeader };

    return <HeaderContext.Provider value={value}>
        { children }
    </HeaderContext.Provider>
}