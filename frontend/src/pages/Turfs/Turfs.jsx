import './Turfs.css';
import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/button';
import Input from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CardSklton from '../../components/CardSkelton/CardSkelton';

const Turfs = () => {
  const [Turfs, setTurfs] = useState([]);
  const navigate = useNavigate();
  const [allTurfs, setAllTurfs] = useState([]); //for filtering easly after feaching all data
  const [allCityFilterButton, setAllCityFilterButton] = useState(true);
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const [loading, setLoading] = useState(true);

  if (!token) {
    console.error('Token not found. User may not be authenticated.');
    return;
  }

  useEffect(() => {
    getTurfs();
  }, []);

  const getTurfs = async () => {
    const response = await axios.get('/turfs', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in Authorization header
      },
    });
    console.log(response.data);
    setAllTurfs(response.data);
    setTurfs(response.data);
    setAllCityFilterButton(true);
    setSelectedCity(null);
    setLoading(false);
  };

  // Card Click
  const onCardClick = id => {
    navigate('/booking/' + id);
  };

  //FILLTERS
  const [selectedCity, setSelectedCity] = useState(null);

  const onCityFilterClick = cityName => {
    if (selectedCity === cityName) {
      setTurfs(allTurfs); // Reset to full data
      setSelectedCity(null);
    } else {
      setTurfs(allTurfs.filter(turf => turf.city === cityName));
      setSelectedCity(cityName);
      setAllCityFilterButton(false);
    }
  };

  // Price Filter
  const [selectedPrice, setSelectedPrice] = useState(null);

  const onPriceFilterClick = async price => {
    if (selectedPrice === price) {
      getTurfs();
      setSelectedPrice(null);
    } else {
      await getTurfs();
      setTimeout(() => {
        setTurfs(prevTurfs =>
          prevTurfs.filter(turf => turf.pricePerHour === price)
        );
        setSelectedCity(price);
      }, 100); // Timeout to ensure state updates properly
    }
  };

  const [turfName, setTurfName] = useState('');

  const onInputChange = e => {
    setTurfName(e.target.value);
  };
  console.log(turfName);

  const onOkButtonClick = async () => {
    const response = await axios.get('/turfs?name=' + turfName, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in Authorization header
      },
    });

    console.log(response.data);
    setTurfs(response.data);
  };
  return (
    <>
      <Navbar />
      <div className="turfPage">
        {/* setion 1 Top Heading */}
        <div className="section1-TurfPage">
          <h1 className="heading">
            Discover and Book Top Football Grounds in Alappuzha District Online
          </h1>
          <div className="right">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Input
              placeholder="turf name"
              onChange={onInputChange}
              classname="input"
            />
            <Button text="ok" className="okbutton" onclick={onOkButtonClick} />
          </div>
        </div>

        {/* setion 2 */}
        <div className="section2-TurfPage">
          {/* Fliter side */}
          <div className="leftFilter">
            <h1 className="heading">Filters</h1>

            <div className="filter-box">
              <h2>City</h2>
              <button
                onClick={getTurfs}
                style={{
                  backgroundColor: allCityFilterButton ? 'green' : 'white',
                  color: allCityFilterButton ? 'white' : 'black',
                }}
                className="all-city-filter-button"
              >
                Al City
              </button>

              {['Alappuzha', 'Ernakulam', 'Kottyam', 'Kannur'].map(
                (city, index) => (
                  <button
                    key={index}
                    onClick={() => onCityFilterClick(city)}
                    style={{
                      backgroundColor:
                        selectedCity === city ? 'green' : 'white',
                      color: selectedCity === city ? 'white' : 'black',
                    }}
                    className="filter-button"
                  >
                    {city}
                  </button>
                )
              )}
            </div>

            <div className="filter-box">
              <h2>Price</h2>
              {[500, 600, 800, 900, 1000, 1200, 1500].map((price, index) => (
                <button
                  key={index}
                  onClick={() => onPriceFilterClick(price)}
                  style={{
                    backgroundColor:
                      selectedPrice === price ? 'green' : 'white',
                    color: selectedPrice === price ? 'white' : 'black',
                  }}
                  className="filter-button"
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Turfs side */}

          <div className="rightTurf">
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => <CardSklton />)
              : Turfs.map((item, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="left">
                        <img src={item.image[0]} alt="" />
                      </div>

                      <div className="right">
                        <h2 className="heading">{item.name}</h2>
                        <p>{item.location}</p>
                        <p>{item.pricePerHour}</p>

                        {/* Bttons in Card */}
                        <div className="buttons">
                          <Button
                            text="Book Now"
                            padding="10px 30px"
                            backgroundcolor="green"
                            color="white"
                            className="card-button"
                            onclick={() => {
                              onCardClick(item._id);
                            }}
                          />

                          <Button
                            text="See Details"
                            padding="10px 30px"
                            backgroundcolor="green"
                            color="white"
                            className="card-button"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Turfs;
