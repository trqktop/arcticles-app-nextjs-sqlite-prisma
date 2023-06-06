import Link from "next/link";
import { Tooltip } from "@mui/joy";
import { useRouter } from "next/router";
import GroupIcon from "@mui/icons-material/Group";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
const UserListLink = () => {
  const router = useRouter();
  const session = useSession();
  if (session.data?.user.role === "1")
    return (
      <Tooltip title="user list">
        <IconButton color="primary" onClick={() => router.push("/users")}>
          <GroupIcon />
        </IconButton>
      </Tooltip>
    );
  return null;
};

export default UserListLink;
