import { memo } from "react";
import Header from "../Header";
import styles from "./Layout.module.scss";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default memo(Layout);
