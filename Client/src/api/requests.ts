import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Router/Routes";

axios.defaults.baseURL = "http://localhost:5298/api/";
axios.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError) => {
        // Check if `error.response` exists
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
            // Handle cases where no response is received
            console.error("Network error or no response received:", error);
            toast.error("Network error or server is unreachable");
        }

        return Promise.reject(error.response); // Reject with `error.response` or `undefined`
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


const requests = {
    Catalog,
    Errors
}

export default requests