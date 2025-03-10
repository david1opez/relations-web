import styles from "./PageIndicator.module.css";

// COMPONENTS
import Icon from "../Icon/Icon";

// TYPES
import { PageIndicatorProps } from "./PageIndicator.interface";

export default function PageIndicator({ icon, title, subpages, onPageChange }: PageIndicatorProps) {
    const clickablePage = (index: number) => {
        return subpages.length > 1 && index < subpages.length - 1;
    };

    const changePage = (index: number) => {
        if(clickablePage(index) || index === -1) {
            const newSubpages = index === -1 ? [] : subpages.slice(0, index + 1);
            if (onPageChange) {
                onPageChange(newSubpages);
            }
        }
    };

    return (
        <div className={styles.pageIndicatorContainer}>
            <Icon
                name={icon}
                size={37}
                color="var(--blue)"
            />
            <h1
                className={[
                    styles.pageIndicatorTitle,
                    subpages.length > 0 ? styles.clickablePageIndicatorTitle : ""
                ].join(" ")}
                onClick={() => changePage(-1)}
            >
                {title}
            </h1>

            {
                subpages.map((page, index) => (
                    <div className={styles.subpageContainer} key={index}>
                        <div className={styles.subpageDash}>/</div>
                        <h2
                            className={[
                                styles.subpageTitle,
                                clickablePage(index) && styles.clickablePageIndicatorTitle
                            ].join(" ")}
                            onClick={() => changePage(index)}
                        >
                            {page}
                        </h2>
                    </div>
                ))
            }
        </div>
    );
};
