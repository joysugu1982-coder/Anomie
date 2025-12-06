import { getMenu } from "@/lib/shopify";
import Navbar from ".";
import NavbarBehavior from "./navbar-behavior";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function NavbarWrapper() {
  const menu = await getMenu("next-js-frontend-menu");

  return (
    <NavbarBehavior>
      <Navbar menu={menu} />
    </NavbarBehavior>
  );
}
