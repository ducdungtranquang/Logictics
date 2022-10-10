import { useContext } from "react";

import { MainContext } from "./../context/MainContext";
import { axios } from "axios";
const { accessToken } = useContext(MainContext);
/* export default function useAuthConfig() {

  return {
    authorization: `Bearer ${accessToken}`,
  };
} */

