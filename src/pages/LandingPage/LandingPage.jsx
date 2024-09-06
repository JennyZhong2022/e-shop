import React, { useEffect, useState } from 'react';
import { getAllSnack, getCheapSnack } from '../../services/snack';
import styles from './LandingPage.module.scss';
import SnackCard from '../../components/SnackCard/SnackCard';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [allSnacks, setAllSnacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4


  
  const [cheapSnacks, setCheapSnacks] = useState([]);
  const navigate=useNavigate()



  useEffect(() => {
    getCheapSnack()
      .then((data) => setCheapSnacks(data))
      .catch((e) => console.log(e));
  }, []);


  useEffect(() => {
    getAllSnack()
      .then((data) => setAllSnacks(data))
      .catch((e) => console.log(e));
  }, []);
  
 
  // If there are 16 snacks, every page needs to have 4 snacks,
  // needs 4 pages to show all the Snacks.  16/4=4 pages, every page has an index. 4 pages index(0,1,2,3) 
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
    // If the current index is 0, set it to the last slide index, otherwise decrement by 1
      prevIndex === 0 ? Math.ceil(allSnacks.length/itemsPerPage) - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(allSnacks.length/itemsPerPage) - 1 ? 0 : prevIndex + 1
    );
  };

  const handleShopNow = () => {
    navigate('/snacks')
  }


  return (
    <main className={styles.main}>

      <section className={styles.LandingPageTopSection}>
        <div className={styles.topLeftImage}>
          <img src="https://shop.snackproud.com.au/cdn/shop/products/SnackBoxes-ProteinSnackBundle.png?v=1658711090" alt="Snacks picture" />
        </div>

        <div className={styles.topRightContent}>
        <p>Feel-good Snacks Delivered </p>
        <p>Say good-by to the 3pm sugar crash.</p>
        <p>Shop curated healthy snacks and gifts.</p>
        <button className={styles.LandingPageTopBtn} 
         onClick={handleShopNow}
          >SHOP NOW</button>
        </div>
     </section>

      <section className={styles.carouselSection}>
          <div className={styles.carouselTileAndArrows}>
            <button onClick={prevSlide} className={styles.navButton}>
              <img src="./src/assets/icons8-back-50.png" alt="Previous" />
            </button>
            <p>Shop Our Best Selling Snack Boxes and Gifts</p>
            <button onClick={nextSlide} className={styles.navButton}>
            <img src="./src/assets/icons8-right-arrow-50.png" alt="Next" />
             
            </button>
          </div>
          <div
            className={styles.carouselInner}
            style={{
              transform: `translateX(-${currentIndex * (100 / allSnacks.length)}%)`, // Moves the carousel to show the current slide， if currentIndex=2, 2*100/16=12.5% ， translateX - means move to left. 
              width: `${allSnacks.length * 100}%`, // base on itemsPerPage =4, allSnacks.length =16, all snacks width is 1600% , each single snack is 1600%/16=100%
            }}
          >
            {allSnacks.map((snack) => (
              <div
                key={snack.id}
                className={styles.carouselItem}
              >
                <SnackCard snack={snack} />
              </div>
            ))}
        </div>
      </section>

      <div className={styles.onlyShowInSmallScreenSection}>
      <section className={styles.topSellSnacksSection}>
        <p className={styles.topSellSnackP}>Shop Our Best Selling Snack Boxes and Gifts</p>
        <div className={styles.topSellSnackInner}>
      {allSnacks.slice(0,8).map((snack) => (
        <SnackCard key={snack.id} snack={snack} />
      ))}
          </div>
    </section>
    </div>

    
      <section className={styles.cheapSnacksSection}>
        <p className={styles.cheapSnackP}>Valuable Sell Snacks</p>
        <div className={styles.cheapSnackInner}>
      {cheapSnacks.map((cheapSnack) => (
        <SnackCard key={cheapSnack.id} snack={cheapSnack} />
      ))}
          </div>
    </section>


    </main>
  );
};

export default LandingPage;