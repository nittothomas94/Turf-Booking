import './Turfs.css';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/button';
import { Navigate, useNavigate } from 'react-router-dom';
const AdminTurfsPage = () => {
  const [Turfs, setTurfs] = useState([]);

  const token = localStorage.getItem('token');

  const navgate = useNavigate();

  useEffect(() => {
    getTurfs();
  }, []);

  const getTurfs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/turfs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTurfs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddTurfButtonClick = () => {
    navgate('/admin/add-turf');
  };

  const onEditClick = id => {
    navgate('/admin/edit-turf/' + id);
  };

  const onDeleteClick = async id => {
    const response = await axios.delete(
      'http://localhost:3000/api/turfs/' + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Turf Deleted');
    getTurfs();
  };

  console.log(Turfs);
  return (
    <div className="admin-turfs-container">
      <AdminNavigationbar />

      {/* RIGHT SIDE OF PAGE */}

      <div className="admin-turfs">
        {/* TOP OF PAEGE */}
        <div className="top">
          <div className="left"></div>
          <div className="right">
            <Button
              text="ADD TURF"
              className="addTurfButton"
              onclick={onAddTurfButtonClick}
            />
          </div>
        </div>

        {/* BOTTOM OF PAGE */}
        <div className="bottom">
          <div className="bottom-headings">
            <p>Image</p>
            <p>Name</p>
            <p>City</p>
            <p>UpdatedAt</p>
            <p>Actions</p>
          </div>
          {Turfs.map(item => {
            return (
              // card
              <div className="card">
                <div className="Turfimg">
                  <img src={item.image[0]} alt="Turf Image" />
                </div>
                <p>{item.name}</p>
                <p>{item.city}</p>
                <p>{item.updatedAt}</p>
                <div className="action-buttons">
                  <Button
                    text="Edit"
                    className="action-buttons-button"
                    backgroundcolor="green"
                    onclick={() => {
                      onEditClick(item._id);
                    }}
                  />
                  <Button
                    text="Delete"
                    className="action-buttons-button"
                    backgroundcolor="red"
                    onclick={() => {
                      onDeleteClick(item._id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminTurfsPage;
