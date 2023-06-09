import { Tooltip } from "@mui/joy";
import { useRouter } from "next/router";
import GroupIcon from "@mui/icons-material/Group";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { memo } from "react";

const UserListLink: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  if (session.data?.user.role === "1")
    return (
      <Tooltip title="Список пользователей">
        <IconButton color="primary" onClick={() => router.push("/users")}>
          <GroupIcon />
        </IconButton>
      </Tooltip>
    );
  return null;
};

export default memo(UserListLink);
