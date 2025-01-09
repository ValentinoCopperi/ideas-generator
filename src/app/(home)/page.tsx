import Container from "@/components/Container";
import FloatingBox from "./_components/floatin-box";
import HeroContainer from "./_components/hero-container";

export default function Home() {
  return (
    <>
      <Container
        classname="w-full flex-1 flex justify-center items-center bg-accent sm:rounded-[32px]
        px-4 py-8 mt-8 border border-border relative overflow-hidden __bg-hero">
          <div>
            <HeroContainer/>
            <FloatingBox initialPosition="-100%" className="-left-8 top-24 bg-[#fff9b1]" />
            <FloatingBox initialPosition="100%" className="-right-8 bottom-12 bg-[#fff9b1]" />
          </div>
      </Container>
    </>
  );
}
