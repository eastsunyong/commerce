import LogInForm from "@/components/logInForm";
import { Helmet } from "react-helmet";

export default function LogIn() {
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <div className="flex flex-col items-center md:mt-36 mt-12">
        <h3 className="md:text-2xl text-xl font-normal text-zinc-700 mb-10">회원 로그인</h3>
        <LogInForm />
      </div>
    </>
  );
}
