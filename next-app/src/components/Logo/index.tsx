import LogoDevOutlinedIcon from "@mui/icons-material/LogoDevOutlined";
import Image from "next/image";
import Link from "next/link";
import logo from '../../../public/pngwing.com.png'
const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" width={20} />
      {/* <LogoDevOutlinedIcon fontSize="large" color="primary" /> */}
    </Link>
  );
};

export default Logo;
