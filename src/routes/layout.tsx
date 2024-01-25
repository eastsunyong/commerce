// root
// import Header from "src/components/Header";
import { Header } from "@/components/header";
import classNames from "classnames";
import {
  DrawerLeft,
  DrawerLeftTrigger,
  DrawerLeftContent,
  DrawerLeftHeader,
  DrawerLeftTitle,
  DrawerLeftDescription,
  DrawerLeftFooter,
  DrawerLeftClose,
} from "@/components/ui/drawerLeft";
import {
  DrawerRight,
  DrawerRightTrigger,
  DrawerRightContent,
  DrawerRightHeader,
  DrawerRightTitle,
  DrawerRightDescription,
  DrawerRightFooter,
  DrawerRightClose,
} from "@/components/ui/drawerRight";
import DocsSidebarNav from "@/components/ui/sidebar";
import { useAuthenticateAdmin, useAuthenticateUser } from "@/hooks/useAuthenticate";
import { Link, Outlet } from "react-router-dom";
import logo from "src/assets/logo.png";
import { Input } from "@/components/ui/formInput";
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
  const isLoggedIn = useAuthenticateUser();
  const isAdmin = useAuthenticateAdmin();

  const headerNav = [
    isLoggedIn ? { title: "로그아웃", href: "/logout" } : { title: "로그인", href: "/login" },
    { title: "장바구니", href: "/basket" },
    !isLoggedIn && { title: "회원가입", href: "/signup" },
    !isAdmin && { title: "마이페이지", href: "/mypage" },
    isAdmin && { title: "주문조회", href: "/orders" },
  ];

  return (
    <div className="w-full flex flex-col h-screen bg-slate-300">
      <div className="hidden md:inline-block">
        <Header items={headerNav} />
        <div className="hidden md:flex flex-row bg-slate-100 flex-grow">
          <div className="flex flex-col">
            <img src={logo} width={120} />
            <DocsSidebarNav items={sidebarNav} />
          </div>
          <div className="p-10 flex-grow">
            <Outlet />
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden">
        <Header items={headerNav} />
        <div className="flex justify-between">
          <DrawerLeft direction="left">
            <DrawerLeftTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </DrawerLeftTrigger>
            <DrawerLeftContent>
              <DrawerLeftHeader>
                <DrawerLeftTitle>
                  <DocsSidebarNav items={sidebarNav} />
                </DrawerLeftTitle>
                {/* <DrawerLeftDescription>This action cannot be undone.</DrawerLeftDescription> */}
              </DrawerLeftHeader>
              <DrawerLeftFooter>
                <DrawerLeftClose>{/* <Button variant="outline">Cancel</Button> */}</DrawerLeftClose>
              </DrawerLeftFooter>
            </DrawerLeftContent>
          </DrawerLeft>
          <img src={logo} width={70} />
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
        <Outlet />
      </div>
    </div>
  );
}
