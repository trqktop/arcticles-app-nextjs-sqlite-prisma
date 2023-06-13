import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import logo from '../../../public/pngwing.com.png'
const Logo = () => {
  return (
    <Link href="/">
      <Image priority src={logo} alt="logo" width={40} />
    </Link>
  );
};

export default memo(Logo);
