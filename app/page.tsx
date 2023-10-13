import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Navbar />
      <section className="flex-start flex-col paddings mb-16">
        <h1>Catogaries</h1>
        <h1>Posts</h1>
        <h1>LoadMore</h1>
      </section>
      <Footer />
    </>
  );
};

export default Home;
