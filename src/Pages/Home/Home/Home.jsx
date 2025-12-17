import React from 'react';
import Banner from '../../../Components/Banner';
import FeaturedSection from '../../../Components/FeaturedSection';
import ContactUs from '../../../Components/ContactUs';

const Home = () => {
    return (
        <div>
          <section>
             <Banner></Banner>
          </section>
          <section>
            <FeaturedSection></FeaturedSection>
          </section>
          <section>
            <ContactUs></ContactUs>
          </section>

        </div>
    );
};

export default Home;