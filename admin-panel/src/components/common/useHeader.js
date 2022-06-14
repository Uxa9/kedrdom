import { useContext } from "react";
import { HeaderContext } from "./HeaderProvider";

export function useHeader() {
    return useContext(HeaderContext);
}