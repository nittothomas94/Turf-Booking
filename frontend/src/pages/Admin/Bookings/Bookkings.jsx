import './Bookings.css';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import { useState, useEffect } from 'react';
import Button from '../../../components/Button/button';
import axios from '../../../utils/axios';
import BookedCardSklton from '../../../components/BookedCardSklton/BookedCardSklton';

const Bookings = () => {
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookedSlotsOfUsers();
  }, []);

  const getAllBookedSlotsOfUsers = async () => {
    try {
      const response = await axios.get('/slots/allbookingsofusers');
      setBooked(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  console.log(booked);

  return (
    <div className="bookings-container">
      <AdminNavigationbar />

      <div className="booking-admin">
        <h1>Booked Turfs</h1>

        {loading ? (
          [1, 2, 3].map(() => <BookedCardSklton />)
        ) : booked.length > 0 ? (
          booked.map(item => (
            <div className="card" key={item._id}>
              <img src="/images/default-turf.jpg" alt="turf Image" />
              <p>Date: {item.date}</p>
              <p>
                <strong>Slot:</strong> {item.slot}
              </p>
              <p>
                <strong>Turf ID:</strong> {item.turfId}
              </p>
              <p>
                <strong>Order ID:</strong> {item._id}
              </p>

              <Button
                text="Download PDF"
                className="download-pdf"
                onclick={() => generatePDF(item)}
              />
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
