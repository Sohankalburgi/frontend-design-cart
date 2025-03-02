import { ModeToggle } from "@/components/Toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="mx-auto flex w-full justify-center h-screen items-center">
      <Link href={"/products"} >
      <Button > Go TO ALL PRODUCTS</Button>
      </Link>
    </div>
  );
}
