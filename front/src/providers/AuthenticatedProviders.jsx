import { useAuth } from "../hooks/useAuth";

export default function AuthenticatedProviders({ children }) {
    const { user } = useAuth();

    if (!user) {
        return children;
    }

    return (
        <>
            {children}
        </>
    );
}
