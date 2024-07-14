import { ReactNode } from "react";

export interface IErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export interface IErrorBoundaryProps {
    children: ReactNode
}