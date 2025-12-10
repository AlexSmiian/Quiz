import * as React from "react";
import styles from './title.module.scss'

interface TitleH2Props {
    children: React.ReactNode;
    classModifier?: string;
}

export default function TitleH2({ children, classModifier }: TitleH2Props) {
    const combinedClassName = [styles.title, classModifier].filter(Boolean).join(" ");

    return (
        <h2 className={combinedClassName}>
            {children}
        </h2>
    );
}
