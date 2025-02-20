import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Router/Routes";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:5298/api/";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
    const token = store.getState().account.user?.token;
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { data, status } = error.response as AxiosResponse;
            switch (status) {
                case 400:
                    if (data.errors) {
                        const modelErrors: string[] = [];

                        for (const key in data.errors) {
                            modelErrors.push(data.errors[key]);
                        }

                        throw modelErrors;
                    }
                    toast.error(data.title);
                    break;

                case 401:
                    toast.error(data.title);
                    break;

                case 404:
                    router.navigate("/not-found");
                    break;

                case 500:
                    router.navigate("/server-error", { state: { error: data, status: status } });
                    break;

                default:
                    toast.error("An unexpected error occurred");
                    break;
            }
        } else {
            console.error("Network error or no response received:", error);
            toast.error("Network error or server is unreachable");
        }

        return Promise.reject(error.response);
    }
);

const queries =
{
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) => axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data),
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`),
}

const Errors = {
    get400Error: () => queries.get("/Error/bad-request"),
    get401Error: () => queries.get("/Error/unauthorized"),
    get404Error: () => queries.get("/Error/not-found"),
    get500Error: () => queries.get("/Error/server-error"),
    getValidationError: () => queries.get("/Error/validation-error"),
}

const Cart = {
    get: () => queries.get("Cart"),
    addItem: (productId: number, quantity = 1) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (formData: any) => queries.post("account/login", formData),
    register: (formData: any) => queries.post("account/register", formData),
    getUser: () => queries.get("account/getuser"),
}

const requests = {
    Catalog,
    Errors,
    Cart,
    Account
}

export default requests