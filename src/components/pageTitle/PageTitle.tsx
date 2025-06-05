import styles from "./pageHeader.module.css";

// COMPONENTS
import Icon from "@/components/icon/Icon";

// TYPES
import { PageHeaderProps } from "@/types/components/pageHeaderTypes";

export default function PageHeader({ icon, title, subpages = [], onPageChange, onBack }: PageHeaderProps) {
  const clickablePage = (index: number) =>
    subpages.length > 1 && index < subpages.length - 1;

  const changePage = (index: number) => {
    if (clickablePage(index) || index === -1) {
      const newSubpages = index === -1 ? [] : subpages.slice(0, index + 1);
      if (onPageChange) onPageChange(newSubpages);
    }
  };

  return (
    <div className={styles.pageHeaderContainer}>
      <div className={styles.mainTitleContainer}>
        <Icon name={icon} size={30} color="var(--accent)" />
        <h1
          className={[
            styles.pageHeaderTitle,
            subpages.length > 0 ? styles.clickablePageHeaderTitle : "",
          ].join(" ")}
          onClick={() => (onBack ? onBack() : changePage(-1))}
        >
          {title}
        </h1>
      </div>

      {subpages.map((page, index) => (
        <div className={styles.subpageContainer} key={index}>
          <div className={styles.subpageDash}>/</div>
          <h2
            className={[
              styles.subpageTitle,
              clickablePage(index) && styles.clickablePageHeaderTitle,
            ].join(" ")}
            onClick={() => changePage(index)}
          >
            {page}
          </h2>
        </div>
      ))}
    </div>
  );
}
