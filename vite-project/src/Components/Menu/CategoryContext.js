import { createContext } from "react";

// Create an empty context that will be populated with the state in Menu component
export let CategoryContext = createContext({
    label: "", // initial label value
    setlabel: () => { } // dummy function, will be overridden by useState in Menu component
});
