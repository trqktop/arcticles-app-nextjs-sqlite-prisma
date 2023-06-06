import { Button } from "@mui/base";
import { MenuItem, Switch, Typography } from "@mui/joy";
import { ListItemIcon } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const RoleToggler = () => {
  const session = useSession();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(session.data?.user.role !== "1");
  }, [session.data?.user.role]);

  const toggleRole = () => {
    let role = "1";
    if (session.data?.user.role === "1") {
      role = "2";
    }
    fetch(`/api/users/${session.data?.user.id}`, {
      method: "PATCH",
      body: JSON.stringify(role),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      try {
        await signIn("credentials", {
          email: session.data?.user.email,
          password: session.data?.user.password,
          callbackUrl: "/",
          redirect: false,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Switch
      onChange={toggleRole}
      checked={isAdmin}
      startDecorator={<Typography>Admin</Typography>}
      endDecorator={<Typography>User</Typography>}
    />
  );
};

export default RoleToggler;
