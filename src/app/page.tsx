import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">React Learning Project</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/react-basics" className="text-blue-500 hover:underline">
            React Basics
          </Link>
        </li>
        <li>
          <Link href="/react-basics-exercises" className="text-blue-500 hover:underline">
            React Basics Exercises
          </Link>
        </li>
        <li>
          <Link href="/chatbot" className="text-blue-500 hover:underline">
            Chatbot
          </Link>
        </li>
      </ul>
    </div>
  );
}
