import './AddTurf.css';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/button';
import { useState } from 'react';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';

const AddTurf = () => {
  const [Turfs, setTurfs] = useState({
    name: ' ',
    city: 'Alappuuzha',
    location: 'Champakulam',
    googleMap:
      'https://www.google.com/maps/place/Champakulam,+Kerala/@9.4104743,76.3959192,15.29z/data=!4m15!1m8!3m7!1s0x3b089c540987eae9:0xaaea7486b5dc7f02!2sChampakulam,+Kerala!3b1!8m2!3d9.4109488!4d76.4102542!16s%2Fm%2F03cyyfy!3m5!1s0x3b089c540987eae9:0xaaea7486b5dc7f02!8m2!3d9.4109488!4d76.4102542!16s%2Fm%2F03cyyfy?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D',
    pricePerHour: 300,
    phoneNumber: '13345678',
    image:
      'https://res.cloudinary.com/dckwaenfe/image/upload/v1741855955/Turf%20Booking%20Images/turf.jpg',
    availableGame: 'FootBall',
  });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setTurfs({ ...Turfs, [key]: e.target.value });
  };

  console.log(Turfs);
  // const onUploadImage = async e => {
  //   // console.log(e.target.files[0]);
  //   const files = Array.from(e.target.files); // Convert FileList to an array
  //   console.log(files); // You can now handle multiple files
  //   const imageData = e.target.files[0];

  //   const formData = new FormData();

  //   formData.append('avatars', imageData);

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3000/api/uploadImage',
  //       formData
  //     );
  //     console.log(response);
  //     setTurfs({ ...Turfs, image: response.data.urls });
  //   } catch (error) {
  //     console.error('image Upload Faild', error.message);
  //   }
  // };

  const onUploadImage = async e => {
    const imageData = e.target.files[0]; // Get the file
    const formData = new FormData();
    formData.append('avatar', imageData); // Append the image to formData with the key 'avatars'

    try {
      const response = await axios.post(
        '/uploadImage', // Backend API URL
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } } // Required for file uploads
      );

      console.log(response.data.urls); // Logs the uploaded image URL(s)
      setTurfs({ ...Turfs, image: response.data.cloudinaryUrl }); // Save the URL(s) in your state
    } catch (error) {
      console.error('Image Upload Failed', error.message);
    }
  };

  const OnAddTurfButtonClick = async () => {
    try {
      console.log(Turfs);

      const response = await axios.post('/turfs', Turfs);
      navigate('/admin/turfs');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="add-turf-container">
      <AdminNavigationbar />
      <div className="addTurf">
        <div className="top">
          <h1>Add New Turf</h1>
        </div>
        <div className="center">
          <Input
            label="Name Of Turf"
            type="text"
            placeholder="eg: Aspeto Turf"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'name');
            }}
          />
          <Input
            label="City"
            type="text"
            placeholder="eg: Alappuzha"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'city');
            }}
          />
          <Input
            label="Location"
            type="text"
            placeholder="eg: Block Office Rd, Kalappurakkal, Kakkanad, Kerala 682030"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'location');
            }}
          />
          <Input
            label="Google Map Location"
            type="text"
            placeholder="https://www.google.com/maps/nearexample"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'googleMap');
            }}
          />
          <Input
            label="Price Per Hour"
            type="Number"
            placeholder="eg: 500"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'pricePerHour');
            }}
          />
          <Input
            label="Images"
            type="file"
            classname="add-turf-input"
            onChange={e => {
              onUploadImage(e, 'image');
            }}
          />
          <Input
            label="Phone number"
            type="number"
            placeholder="eg: 9446979075"
            classname="add-turf-input"
            onChange={e => {
              onChange(e, 'phoneNumber');
            }}
          />
        </div>
        <div className="bottom">
          <Button
            text="Add Turf"
            className="addTurf-btn"
            onclick={OnAddTurfButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTurf;
