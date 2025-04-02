"use client";

import styles from "./ProfileIcon.module.css";
import Icon from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";

export default function ProfileIcon({ className }: { className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/MyProfile");
  };

  return (
    <div className={`${styles.iconWrapper} ${className}`} onClick={handleClick}>
      <Icon name="user" size={24} color="var(--blue)" />
    </div>
  );
}