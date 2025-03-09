import { createContext } from "react";

export const UserContext = createContext({
    ID: "",
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Phone: "",
    Password: "",
}) 