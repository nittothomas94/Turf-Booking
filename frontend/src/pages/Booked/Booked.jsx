import './Booked.css';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import BookedCardSklton from '../../components/BookedCardSklton/BookedCardSklton';

const Booked = () => {
  const [booked, setBooked] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookedSlotsOfUserById();
  }, []);

  const getBookedSlotsOfUserById = async () => {
    try {
      const response = await axios.get('/slots/bookingsofuser', {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in Authorization header
        },
      });
      setBooked(response.data); // Update state with API response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  // console.log(booked);

  const generatePDF = booking => {
    console.log('sdfsd');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Booking Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${booking.date}`, 10, 20);
    doc.text(`Slot: ${booking.slot}`, 10, 30);
    doc.text(`Turf ID: ${booking.turfId}`, 10, 40);
    doc.text(`Order ID: ${booking._id}`, 10, 50);
    doc.save(`Booking_${booking._id}.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="booked-page">
        <div className="booked-page-image">
          <img src="/images/game2.jpg" alt="left side Image" />
        </div>
        <div className="booked-page-content">
          <h1>Bookings</h1>
          <div className="search-booked">
            <Input
              classname="search-input"
              placeholder="Search Your Booking By Date"
            />
            <Button text="Search Booked" className="search-button" />
          </div>

          {/* Booked Turf Lists */}
          <div className="booked-turfs-list">
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
      </div>
    </>
  );
};

export default Booked;
