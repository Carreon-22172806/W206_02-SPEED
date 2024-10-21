'use client'

import LoginAccount from "@/components/Account/Login";
import ShowBookDetails from "@/components/Book/ShowBookDetails";
import CreateBook from "./create-book/page";
import Login from "./login-account/[id]/page";

export default function Home() {
  return (
    <main>
      <LoginAccount />
    </main>
  );
}

