import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
    
      <header className="max-h-screen overflow-hidden">
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
