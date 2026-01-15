import { useAuth } from "../hooks/useAuth";
import CacheProvider from "./CacheProvider";

export default function AuthenticatedProviders({ children }) {
    const { user } = useAuth();

    if (!user) {
        return children;
    }

    return (
        <CacheProvider>
            <>{children}</>
        </CacheProvider>
    );
}
