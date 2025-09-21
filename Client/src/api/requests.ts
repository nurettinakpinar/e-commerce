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

        return Promise.reject(error);
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
    create: (body: any) => queries.post("products", body),
    update: (id: number, body: any) => queries.put(`products/${id}`, body),
    delete: (id: number) => queries.delete(`products/${id}`),
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('products/upload-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data);
    }
}

const Errors = {
    get400Error: () => queries.get("/Error/bad-request"),
    get401Error: () => queries.get("/Error/unauthorized"),
    get404Error: () => queries.get("/Error/not-found"),
    get500Error: () => queries.get("/Error/server-error"),
    getValidationError: () => queries.get("/Error/validation-error"),
}

const Cart = {
    get: () => queries.get("cart"),
    addItem: (productId: number, quantity = 1) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (formData: any) => queries.post("account/login", formData),
    register: (formData: any) => queries.post("account/register", formData),
    getUser: () => queries.get("account/getuser"),
}

const Order = {
    getOrders: () => queries.get("order/getOrders"),
    getOrder: (id: number) => queries.get(`order/getOrder/${id}`),
    createOrder: (formData: any) => queries.post("order/createOrder", formData),
    // Admin endpoints
    getAllOrders: () => queries.get("order/admin/all"),
    updateOrderStatus: (id: number, status: number) => queries.put(`order/admin/${id}/status`, { status }),
    deleteOrder: (id: number) => queries.delete(`order/admin/${id}`)
}

const Review = {
    getProductReviews: (productId: number) => queries.get(`review/product/${productId}`),
    getProductStats: (productId: number) => queries.get(`review/product/${productId}/stats`),
    create: (review: any) => queries.post("review", review),
    update: (id: number, review: any) => queries.put(`review/${id}`, review),
    delete: (id: number) => queries.delete(`review/${id}`)
}

const requests = {
    Catalog,
    Errors,
    Cart,
    Account,
    Order,
    Review,
    Content: {
        get: (key: string) => queries.get(`content/${key}`),
        update: (key: string, value: string) => queries.put(`content/${key}`, { key, value })
    },
    Category: {
        list: () => queries.get("category"),
        listAll: () => queries.get("category/all"),
        get: (id: number) => queries.get(`category/${id}`),
        create: (body: any) => queries.post("category", body),
        update: (id: number, body: any) => queries.put(`category/${id}`, body),
        delete: (id: number) => queries.delete(`category/${id}`)
    },
    Seo: {
        get: (pageKey: string) => queries.get(`seo/${pageKey}`),
        getAll: () => queries.get("seo"),
        update: (pageKey: string, body: any) => queries.put(`seo/${pageKey}`, body),
        delete: (pageKey: string) => queries.delete(`seo/${pageKey}`)
    },
    Admin: {
        users: () => queries.get("admin/users"),
        updateRoles: (id: string, roles: string[]) => queries.put(`admin/users/${id}/roles`, { roles }),
        block: (id: string) => queries.post(`admin/users/${id}/block`, {}),
        unblock: (id: string) => queries.post(`admin/users/${id}/unblock`, {})
    }
}

export default requests