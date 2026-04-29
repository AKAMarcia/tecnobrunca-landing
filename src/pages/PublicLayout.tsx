import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
