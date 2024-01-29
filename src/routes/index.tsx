// root of the project
import { Header } from "@/components/header";
import {
  DrawerLeft,
  DrawerLeftTrigger,
  DrawerLeftContent,
  DrawerLeftHeader,
  DrawerLeftTitle,
  DrawerLeftFooter,
  DrawerLeftClose,
} from "@/components/ui/drawerLeft";
import {
  DrawerRight,
  DrawerRightTrigger,
  DrawerRightContent,
  DrawerRightHeader,
  DrawerRightFooter,
  DrawerRightClose,
} from "@/components/ui/drawerRight";
import DocsSidebarNav from "@/components/sidebar";
import { Link, Outlet } from "react-router-dom";
import logo from "src/assets/logo.png";
import { Input } from "@/components/ui/formInput";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { HeaderNavItem } from "@/types";

export const sidebarNav = [
  {
    title: "ROCK/POP/ETC",
    href: "/category/rock-pop-etc",
  },
  {
    title: "RSD EXCLUSIVE",
    href: "/category/rsd-exclusive",
  },
  {
    title: "JAZZ",
    href: "/category/jazz",
  },
  {
    title: "OST",
    href: "/category/ost",
  },
  {
    title: "K-POP",
    href: "/category/kpop",
  },
  {
    title: "J-POP/CITY POP/ASIA",
    href: "/category/jpop-citypop-asia",
  },
  {
    title: "MERCHANDISE",
    href: "/category/merchandise",
  },
];

export default function Layout() {
  const userInfo = useContext(AuthContext);
  const isAdmin = userInfo?.type === "관리자" ? true : false;
  // 전역관리 유저타입 저장
  const headerNav: HeaderNavItem[] = [
    userInfo ? { title: "로그아웃", href: "/" } : { title: "로그인", href: "/login" },
    { title: "장바구니", href: "/basket" },
    !userInfo ? { title: "회원가입", href: "/signup" } : { title: "", href: "" },
    !isAdmin ? { title: "마이페이지", href: "/mypage" } : { title: "주문조회", href: "/orders" },
    // isAdmin && { title: "주문조회", href: "/orders" },
  ];

  return (
    <div className="w-full flex flex-col h-screen">
      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:inline-block">
        <Header items={headerNav} />
        <div className="px-12 py-8 hidden md:flex flex-row flex-grow h-full">
          <div>
            <Link to={"/"} className="flex flex-col mb-7">
              <img src={logo} width={120} />
            </Link>
            <DocsSidebarNav items={sidebarNav} />
          </div>
          <div className="flex-grow ">
            <Outlet />
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden">
        <Header items={headerNav} />
        <div className="px-5 py-3 flex justify-between">
          <DocsSidebarNav items={sidebarNav} />
          <Link to={"/"}>
            <img src={logo} width={70} />
          </Link>
          <DrawerRight direction="right">
            <DrawerRightTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </DrawerRightTrigger>
            <DrawerRightContent>
              <DrawerRightHeader>
                <Input className="bg-zinc-600 text-white h-10" />
                {/* <DrawerRightTitle>Are you absolutely sure?</DrawerRightTitle>
                <DrawerRightDescription>This action cannot be undone.</DrawerRightDescription> */}
              </DrawerRightHeader>
              <DrawerRightFooter>
                {/* <Button>Submit</Button> */}
                <DrawerRightClose>{/* <Button variant="outline">Cancel</Button> */}</DrawerRightClose>
              </DrawerRightFooter>
            </DrawerRightContent>
          </DrawerRight>
        </div>
        <div className="flex-grow h-full px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}