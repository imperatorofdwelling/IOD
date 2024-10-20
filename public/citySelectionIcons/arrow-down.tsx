import { JSX, SVGProps } from "react";

export const ArrowDown
    = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 1L11.5 11L22 1" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
    );