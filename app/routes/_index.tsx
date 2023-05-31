import type { V2_MetaFunction } from "@remix-run/node";
import { HeroHomepage } from "../components/HeroHomepage";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "MakeupDB" },
    { name: "description", content: "Beautify Yourself" },
  ];
};

export default function Index() {
  return (
    <div>
      <HeroHomepage />
    </div>
  );
}
