import { api } from "./axios";

export const userService = {
    login: (credencials) => api.post("/user/login", credencials),
    logout: (user) => api.post("/user/logout"),
    refresh: () => api.post("/user/session"),
};
