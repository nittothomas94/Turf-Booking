import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/button';
import { ToastContainer, toast } from 'react-toastify';
import './Booking.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BookingPage = () => {
  const [Turfs, setTurfs] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([
    '7:00am - 8:00am',
    '8:00am - 9:00am',
    '5:00pm - 6:00pm',
    '6:00pm - 7:00pm',
    '7:00pm - 8:00pm',
  ]);
  const [bookedSlots, setBookedSlots] = useState([]); //fetched from the backend
  const [selectedSlot, setSelectedSlot] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { id } = useParams();

  useEffect(() => {
    getTurfById();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      checkBookedSlots();
    }
  }, [selectedDate]);
  // When a user selects a date, the function checkBookedSlots() runs to fetch already booked slots for that specific date.

  const getTurfById = async () => {
    const response = await axios.get('http://localhost:3000/api/turfs/' + id, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in Authorization header
      },
    });
    console.log(response.data);
    setTurfs(response.data);
  };

  //lcoation click
  const onLocationClick = () => {
    window.open(Turfs.googleMap);
  };

  //Function to Fetch Booked Slots
  const checkBookedSlots = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/slots/bookedslots' +
          id +
          '?date=' +
          selectedDate
      );
      setBookedSlots(response.data.bookedSlots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  console.log(bookedSlots);

  // Form DATE
  const handleDateChange = e => {
    setSelectedDate(e.target.value);
    setSelectedSlot('');
  };
  // console.log(selectedDate);

  const handleSlotSelect = slot => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
    }
  };

  // handle booking

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error('Please select a date and a slot!');
      return console.log('sdfh');
    }

    // Extract user ID from token
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated!');
      return;
    }

    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; // Ensure this matches the backend's token structure
    } catch (error) {
      console.error('Invalid token:', error);
      toast.error('Invalid session, please login again!');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/slots',
        {
          turfId: id,
          userId: userId, // Passing the extracted user ID
          date: selectedDate,
          slot: selectedSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token in the headers
          },
        }
      );

      toast.success('Booking successful!');

      checkBookedSlots(); // Refresh booked slots

      setTimeout(() => {
        navigate('/booked');
      }, 2000);
    } catch (error) {
      console.error('Error booking slot:', error);
      // return res.status(500).json({ message: error.message });
    }
  };

  return (
    <div className="main">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <Navbar />
      <div className="container-bookingPage">
        <div className="turf-details-map">
          <div className="turf-details">
            <img src={Turfs.image} alt="" />
            <h1 className="heading">{Turfs.name}</h1>
            <p>
              <i className="material-icons">location_on</i>
              {Turfs.location}
            </p>
          </div>
          <div className="googleMap">
            <h2>
              Click The Button To See <br />
              The Google Map Location
            </h2>

            <a href={Turfs.googleMap}>GOOGLE MAP</a>
            <i className="material-icons"> location-chip</i>
          </div>
        </div>

        <div className="booking-and-all">
          {/* <div className="calender">
            <Calendar />
          </div> */}
          <h1>Book Turf</h1>
          <div className="booking">
            <h2 className="sub-heading">Select The Date To Book</h2>
            <Input
              type="date"
              classname="select-date"
              onChange={handleDateChange}
              id="bookingDate"
              name="bookingDate"
            />
            <h2 className="sub-heading">Select Your Slot</h2>

            <div className="slot-container">
              {availableSlots.map(slot => (
                <div
                  key={slot}
                  className={
                    'slot ' +
                    (bookedSlots.includes(slot)
                      ? 'booked'
                      : selectedSlot === slot
                      ? 'selected'
                      : '')
                  }
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>

            <br />
            <h2 className="sub-heading">Total Price = {Turfs.pricePerHour}</h2>
            <Button
              text="Book Now"
              className="book-now"
              onclick={handleBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
