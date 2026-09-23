import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
    return (
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {children}
        </div>
    );
}