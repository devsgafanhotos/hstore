import { useAuth } from "../hooks/useAuth";
import ActionProvider from "./ActionProvider";
import CacheProvider from "./CacheProvider";

export default function AuthenticatedProviders({ children }) {
    const { user } = useAuth();

    if (!user) {
        return children;
    }

    return (
        <CacheProvider>
            <ActionProvider>{children}</ActionProvider>
        </CacheProvider>
    );
}
