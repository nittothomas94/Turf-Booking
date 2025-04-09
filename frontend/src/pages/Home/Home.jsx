import './Home.css';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import CardSklton from '../../components/CardSkelton/CardSkelton';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [Turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const onBookTurfClick = () => {
    navigate('/turfs');
  };

  const onContactClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    getTurfs();
  }, []);

  const getTurfs = async () => {
    const response = await axios.get('/hometurf');
    const firstSixTurfs = response.data.slice(0, 4); // Select first 4 documents
    setTurfs(firstSixTurfs);
    setLoading(false);
  };

  console.log(Turfs);

  return (
    <>
      <Navbar />

      <div className="home" id="home">
        {/* Home section 1 */}
        <div className="section1">
          {/* Left side of section 1 */}

          <div className="left-side">
            <h1 className="headding">
              &nbsp; Made you <br />
              play simple
            </h1>
            <p>Book Your Turf Anytime, Anywhere!</p>
            <div className="buttons">
              <Button
                text="Book Turf"
                className="section01-home-buttons book-turf"
                onclick={onBookTurfClick}
              />
              <Button
                text="Contact"
                className="section01-home-buttons contact-turf"
                onclick={onContactClick}
              />
            </div>
          </div>

          {/* Right Side of Section 1 */}
          <div className="right-side">
            <img
              src="/images/football.jpeg"
              alt="football Game"
              className="footballGame"
            />

            {/* jhf */}
            <img
              src="/images/cricket.jpeg"
              alt="Criket Game"
              className="cricketGame"
            />
            <img
              src="/images/hockey.jpeg"
              alt="Hockey Game"
              className="hockeyGame"
            />
            <img
              src="/images/vollyball.jpg"
              alt="Vollyball Game"
              className="vollyballGame"
            />
            <img
              src="/images/basketball.jpg"
              alt="Basketball Game"
              className="basketballGame"
            />
          </div>
        </div>

        {/* Home Setion 2 */}

        <div className="section2">
          <div className="inner-box">
            {/* top headings */}
            <div className="top">
              <h1 className="headding" style={{ color: 'green' }}>
                Featured Listing
              </h1>
              <h3>most popular Turfs/grounds in your city</h3>
            </div>
            {/* bottom Popular Turfs Lists */}
            <div className="bottom">
              {loading
                ? [1, 2, 3, 4].map(() => <CardSklton />)
                : Turfs.map(item => {
                    return (
                      // Card
                      <div
                        className="card"
                        onClick={() => {
                          navigate('/turfs');
                        }}
                      >
                        <div className="left">
                          {item.image && item.image.length > 0 ? (
                            <img src={item.image[0]} alt="turf image" />
                          ) : (
                            console.log('no image')
                          )}
                        </div>
                        <div className="right">
                          <h4 className="heading">{item.name}</h4>
                          <p>{item.location}</p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>

        {/* Home Section 3 */}

        <div className="section3">
          <img src="/images/dalliAfootballfieldwithplayers.webp" alt="image" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
