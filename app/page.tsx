import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Link href={"/stock"}>stock</Link>
      <Link href={"/stockin"}>stockin</Link>
      <Link href={"/addstockin"}>addstockin</Link>
    </div>
  );
}
