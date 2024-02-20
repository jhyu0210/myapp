import Link from "next/link";
import Postcard from "@/components/Postcard";
import db from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

const getPosts = async () => {
  const posts = await db.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
};

export default async function Home() {
  const session = await getServerAuthSession();

  // console.log("session::::: ", session?.user);
  const feed = await getPosts();
  // console.log("Get Posts:::::", feed);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* <Image
          alt="loggedinUser"
          src={session.user.image!}
          height={24}
          width={24}
        /> */}
      {session ? (
        <>
          <h1>You are logged In..</h1>
          <Image
            alt="loggedinUser"
            src={session.user.image!}
            height={24}
            width={24}
          />
          <Link
            href="/add-post"
            className="border border-slate-400 bg-gray-100 px-4 py-2"
          >
            Add Post
          </Link>
        </>
      ) : null}

      <h1>Feed</h1>
      {feed
        ? feed.map((post) => (
            <div className="grid-cols-3 gap-2 p-2" key={post.id}>
              <Postcard
                id={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author?.name}
              />
            </div>
          ))
        : null}
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
