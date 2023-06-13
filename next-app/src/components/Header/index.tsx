import Profile from "../Profile";
import UserListLink from "../UserListLink";
import Logo from "../Logo";
import LoginMenu from "../LoginMenu";
import { memo } from "react";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        position: "sticky",
        margin: "auto",
        top: 30,
        justifyContent: "space-between",
        maxWidth: "1440px",
        width: "100%",
        zIndex: 1,
      }}
    >
      <Logo />
      <div style={{ display: "flex" }}>
        <UserListLink />
        <Profile />
        <LoginMenu />
      </div>
    </header>
  );
};

export default memo(Header);
