import "../styles/Home.scss";
import HeroBanner from "../Component/HeroBanner/HeroBanner";
import Products from "../Component/Products/Products";

const Home = () => {
  return (
    <>
      <div className="heroBanner">
        <div className="heroBanner__wrapper">
          <HeroBanner />
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
