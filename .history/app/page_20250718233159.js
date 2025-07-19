import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <header className="">
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Hero />
      </main>
    </>
  );
}
