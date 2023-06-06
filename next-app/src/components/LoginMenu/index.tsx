import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/joy";
import { useRouter } from "next/router";

export default function LoginMenu() {
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session.data?.user)
    return (
      <div style={{ marginLeft: "auto" }}>
        <IconButton
          id="positioned-demo-button"
          aria-controls={open ? "positioned-demo-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          color="neutral"
          onClick={handleClick}
        >
          <LoginIcon />
        </IconButton>
        <Menu
          id="positioned-demo-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="positioned-demo-button"
          placement="bottom-end"
        >
          <MenuItem onClick={() => router.push("/login")}>
            <Typography>Login</Typography>
          </MenuItem>
          <MenuItem onClick={() => router.push("/registration")}>
            <Typography>Registration</Typography>
          </MenuItem>
          <ListDivider />
        </Menu>
      </div>
    );
  return null;
}
