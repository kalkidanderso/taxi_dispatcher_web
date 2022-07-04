import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

import Router from "next/router";

export default function Home() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/login");
    }
  });
}
