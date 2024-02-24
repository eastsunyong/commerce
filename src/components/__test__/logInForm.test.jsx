// import { render, screen, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import LoginForm from "../logInForm";
// import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter를 import 해야합니다.
// import userEvent from "@testing-library/user-event";
// describe("logInForm 테스트", () => {
//   test("로그인 폼 컴포넌트 확인", () => {
//     const queryClient = new QueryClient(); // QueryClient 생성

//     render(
//       <Router>
//         <QueryClientProvider client={queryClient}>
//           <LoginForm />
//         </QueryClientProvider>
//       </Router>
//     );
//     // toBeInTheDocument: DOM 요소가 페이지에 렌더링되었는지 여부를 확인
//     expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
//     expect(screen.getByText("소셜 로그인")).toBeInTheDocument();
//   });

//   let mockLogIn = null;
//   beforeEach(() => {
//     mockLogIn = jest.fn();
//   });

//   test("로그인 버튼 클릭 시 로그인 함수 호출", async () => {
//     const queryClient = new QueryClient(); // QueryClient 생성
//     render(
//       <Router>
//         <QueryClientProvider client={queryClient}>
//           <LoginForm />
//         </QueryClientProvider>
//       </Router>
//     );

//     const event = userEvent.setup();

//     // 이메일과 비밀번호 입력란을 찾아서 값을 입력
//     await event.type(screen.getByPlaceholderText("이메일"), "fake", { allAtOnce: true });
//     await event.type(screen.getByPlaceholderText("비밀번호"), "fake", { allAtOnce: true });

//     console.log(screen.getByPlaceholderText("이메일").value);
//     console.log(screen.getByPlaceholderText("비밀번호").value);

//     // 로그인 버튼을 찾아 클릭
//     const loginButton = screen.getByRole("button", { name: "로그인" });
//     loginButton.onclick = (e) => {
//       e.preventDefault();
//       mockLogIn({
//         email: screen.getByPlaceholderText("이메일").value,
//         password: screen.getByPlaceholderText("비밀번호").value,
//       });
//     };
//     window.alert = jest.fn();
//     userEvent.click(loginButton);

//     // 로그인 함수가 호출되었는지 확인
//     await waitFor(() => {
//       expect(mockLogIn).toHaveBeenCalledWith({
//         email: "fake",
//         password: "fake",
//       });
//       // expect(window.alert).toBeCalledWith("이메일과 비밀번호를 다시 한 번 확인해 주세요");
//     });
//     // const alertText = await new Promise((resolve) => {
//     //   window.alert = jest.fn().mockImplementation((message) => {
//     //     resolve(message);
//     //   });
//     // }); // 에러 메시지가 표시되는지 확인
//     // expect(alertText).toBe("이메일과 비밀번호를 다시 한 번 확인해 주세요.");
//   });
// });
