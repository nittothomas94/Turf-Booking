import './EditTurf.css';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/button';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

const EditTurf = () => {
  const [Turf, setTurf] = useState({
    name: '',
    city: '',
    location: '',
    googleMap: '',
    pricePerHour: '',
    phoneNumber: '',
    image: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  // getTurfs api

  const getTurfById = async () => {
    try {
      const response = await axios.get('/turfs/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);

      setTurf(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTurfById();
  }, []);

  console.log(Turf);

  const onChange = (e, key) => {
    setTurf({ ...Turf, [key]: e.target.value });
  };

  const onUploadImage = e => {
    const file = e.target.files[0];
    if (file) {
      setTurf({ ...Turf, image: file });
    }
  };

  const OnCancelTurfButtonClick = () => {
    navigate('/admin/turfs');
  };

  const OnEditTurfButtonClick = async () => {
    console.log(Turf);

    try {
      const response = await axios.patch(`/turfs/${id}`, Turf, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert('updated');
      navigate('/admin/turfs');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="edi-turf-container">
      <AdminNavigationbar />
      <div className="EditTurf">
        <div className="top">
          <h1>Edit Turf</h1>
        </div>
        <div className="center">
          <Input
            label="Name Of Turf"
            type="text"
            classname="edit-turf-input"
            value={Turf.name}
            onChange={e => {
              onChange(e, 'name');
            }}
          />
          <Input
            label="City"
            type="text"
            classname="edit-turf-input"
            value={Turf.city}
            onChange={e => {
              onChange(e, 'city');
            }}
          />
          <Input
            label="Location"
            type="text"
            classname="edit-turf-input"
            value={Turf.location}
            onChange={e => {
              onChange(e, 'location');
            }}
          />
          <Input
            label="Google Map Location"
            type="text"
            classname="edit-turf-input"
            value={Turf.googleMap}
            onChange={e => {
              onChange(e, 'googleMap');
            }}
          />
          <Input
            label="Price Per Hour"
            type="Number"
            classname="edit-turf-input"
            value={Turf.pricePerHour}
            onChange={e => {
              onChange(e, 'pricePerHour');
            }}
          />
          <Input
            label="Images"
            type="file"
            classname="edit-turf-input"
            onChange={e => {
              onUploadImage(e);
            }}
          />

          <Input
            label="Phone number"
            type="String"
            classname="edit-turf-input"
            value={Turf.phoneNumber}
            onChange={e => {
              onChange(e, 'phoneNumber');
            }}
          />
        </div>
        <div className="bottom">
          <Button
            text="Cancel Turf"
            className="EditTurf-btn"
            onclick={OnCancelTurfButtonClick}
          />
          <Button
            text="Edit Turf"
            className="EditTurf-btn"
            onclick={OnEditTurfButtonClick}
            backgroundcolor="red"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTurf;
