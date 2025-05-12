import { Link, LinkProps } from "react-router-dom";
import "./default-link.css";

interface DefaultLinkProps extends LinkProps {
    children: React.ReactNode;
}

export default function DefaultLink({ children, ...props }: DefaultLinkProps) {
    return (
        <Link className="default-link" {...props}>
            {children}
        </Link>
    );
}