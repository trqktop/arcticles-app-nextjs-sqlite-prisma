import { Switch, Typography } from "@mui/joy";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";

const RoleToggler = () => {
  const session = useSession();
  const [isAdmin, setAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAdmin(session.data?.user.role !== "1");
  }, [session.data?.user.role]);

  const toggleRole = useCallback(() => {
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
        await router.push("/");
      } catch (error) {
        console.log(error);
      }
    });
  }, [session.data, router]);

  return (
    <Switch
      onChange={toggleRole}
      checked={isAdmin}
      startDecorator={<Typography>Админ</Typography>}
      endDecorator={<Typography>Пользователь</Typography>}
    />
  );
};

export default memo(RoleToggler);
