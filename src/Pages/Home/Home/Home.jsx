import React from 'react';
import Banner from '../../../Components/Banner';
import FeaturedSection from '../../../Components/FeaturedSection';

const Home = () => {
    return (
        <div>
          <section>
             <Banner></Banner>
          </section>
          <section>
            <FeaturedSection></FeaturedSection>
          </section>

        </div>
    );
};

export default Home;