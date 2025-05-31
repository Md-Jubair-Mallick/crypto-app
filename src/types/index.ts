import type { ReactNode } from "react";

export interface navigationMenuItem {
    label: string;
    path: string;
    element: ReactNode;
}