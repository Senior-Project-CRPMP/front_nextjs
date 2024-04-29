import Image from "next/image";
import Hero from "./component/hero";
import Content from "./component/content";
import Feature from "./component/feature";
import Contact from "./component/contact";
// import Map from "./component/Map";

export default function Home() {
  const position: [number, number] = [51.505, -0.09];

  return (
    <main>
      <Hero />
      <Content />
      <Feature />
      <Contact />
      {/* <Map position={position} /> */}
    </main>
  );
}
