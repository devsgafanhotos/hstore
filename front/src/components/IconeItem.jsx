import { getIcon } from "../utils/iconMapper";

export default function IconeItem({ label, iconKey }) {
    const Icon = getIcon(iconKey);

    return (
        <div>
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );
}
