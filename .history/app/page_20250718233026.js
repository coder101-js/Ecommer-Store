import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
        <Hero />
    </>
  );
}
