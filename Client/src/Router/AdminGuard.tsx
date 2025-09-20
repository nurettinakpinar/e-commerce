import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../store/store";

export default function AdminGuard() {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    const isAdmin = !!user?.roles?.includes("Admin");

    if (!isAdmin) {
        return <Navigate to={"/login"} state={{ from: location }} />
    }

    return <Outlet />
}


