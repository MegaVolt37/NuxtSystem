import { FetchOptions } from "ohmyfetch";
export default function () {
  return {
    users: apiUsers(),
    menu: apiMenu(),
  }
}