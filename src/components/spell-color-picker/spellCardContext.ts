import { createContext } from "react";

export default createContext({
    showCardOne: false,
    showCardTwo: false,
    setShowCardOne: () => { },
    setShowCardTwo: () => { }
})