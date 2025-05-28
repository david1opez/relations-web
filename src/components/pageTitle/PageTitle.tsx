import styles from "./pageTitle.module.css";

// COMPONENTS
import Icon from "@/components/icon/Icon";

// TYPES
import { PageTitleProps } from "@/types/PageTitleTypes";

export default function PageIndicator({ icon, title, subpages, onPageChange, onBack }: PageTitleProps) {
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
                size={30}
                color="var(--accent)"
            />

            <h1
                className={[
                    styles.pageIndicatorTitle,
                    subpages.length > 0 ? styles.clickablePageIndicatorTitle : ""
                ].join(" ")}
                onClick={() => onBack ? onBack() : changePage(-1)}
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
