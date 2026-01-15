import { Link } from "react-router-dom";

export default function MyLinkButton({ sx, title, to }) {
    return (
        <Link
            to={to}
            style={{fontWeight: 600}}
            className={`bg-(--color-secondary) text-(--color-gray)  p-2.5 pt-1.5 pb-1.5 rounded-md ${sx}`}
        >
            {title}
        </Link>
    );
}
