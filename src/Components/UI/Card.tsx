import * as React from "react";
import type {ReactNode} from "react";

interface CardProps {
    title?: string,
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({title, children}) => {
    return <>
        <div className={"pb-10"}>
            {title && <div className={"font-title text-xl text-yimin-blue border-b border-b-yimin-blue mb-2"}>{title}</div>}
            {children}
        </div>
    </>
}


export default Card;