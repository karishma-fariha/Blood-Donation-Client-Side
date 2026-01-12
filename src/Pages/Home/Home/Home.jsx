import React from 'react';
import Banner from '../../../Components/Banner';
import FeaturedSection from '../../../Components/FeaturedSection';
import ContactUs from '../../../Components/ContactUs';
import LiveDispatchBoard from '../../../Components/LiveDispatchBoard';
import DataTicker from '../../../Components/DataTicker';
import SystemArchitecture from '../../../Components/SystemArchitecture';
import LiveStatistics from '../../../Components/LiveStatistics';

const Home = () => {
    return (
        <div>
          <section>
             <Banner></Banner>
          </section>
          <section>
            <DataTicker></DataTicker>
          </section>
           <section>
            <SystemArchitecture></SystemArchitecture>
          </section>
          <section>
            <LiveDispatchBoard></LiveDispatchBoard>
          </section>
         <section>
          <FeaturedSection></FeaturedSection>
         </section>
         <section>
          <LiveStatistics></LiveStatistics>
         </section>
          <section>
            <ContactUs></ContactUs>
          </section>

        </div>
    );
};

export default Home;