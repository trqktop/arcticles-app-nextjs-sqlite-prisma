import LogoDevOutlinedIcon from "@mui/icons-material/LogoDevOutlined";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <LogoDevOutlinedIcon fontSize="large" color="primary" />
    </Link>
  );
};

export default Logo;
