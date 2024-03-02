import Cart from "@/components/Cart";
import Product from "@/components/Product";
import { getServerAuthSession } from "@/server/auth";
// import { redirect } from "next/navigation";
import Image from "next/image";

const products: Product[] = [
  {
    id: "1",
    name: "GoPro",
    price: 57,
    quantity: 0,
  },
  {
    id: "2",
    name: "Tripod",
    price: 7.99,
    quantity: 0,
  },
  {
    id: "3",
    name: "Bag",
    price: 4.99,
    quantity: 0,
  },
];
export default async function Home() {
  // const session = await getServerAuthSession();
  // // if (!session) {
  // //   return redirect("/auth");
  // // }

  // // console.log("session::::: ", session?.user);
  // const feed = await getPosts();
  // console.log("Get Posts:::::", feed);

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
     <div className="flex flex-col gap-8">
        <h1 className="text-3xl">E-Commerce Cart System</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </div>
    </main>
  );
}

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//         <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
