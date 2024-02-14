import { FC } from "react";
import NavBar from "../../components/user/Home/NavBar";
import Banner from "../../components/user/Home/Banner";
import CategorySec from "../../components/user/Home/CategorySec";
import FeaturedJobSec from "../../components/user/Home/FeaturedJobSec";
import TopCompanies from "../../components/user/Home/TopCompanies";

const Home: FC = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <CategorySec />
      <FeaturedJobSec />
      <TopCompanies />
    </>
  );
};

export default Home;
