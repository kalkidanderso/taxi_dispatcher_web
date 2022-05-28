import styles from "./SideBar.module.css";
import NavButton from "../elements/NavButton/index";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import Link from "next/link";
import {useRouter} from "next/router";
import Orders from "../../components/Orders"


const Sidebar = (props) => {

  const router = useRouter();
  const pathName = router.pathname;


  

  return (
      <nav className={styles.sidebar}>
           <Orders />
      </nav>
  );
};

export default Sidebar;
