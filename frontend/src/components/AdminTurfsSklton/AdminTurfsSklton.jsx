import './AdminTurfsSklton.css';
import { Skeleton } from 'antd';

const AdminTurfsSklton = () => {
  return (
    <div className="admin-turfs-sklton">
      {/* Image Skeleton */}
      <div className="sklton-image">
        <Skeleton.Image style={{ width: 200, height: 150 }} />
      </div>

      {/* Texts Section */}
      <div className="sklton-texts">
        <Skeleton.Input
          active
          size="small"
          style={{ width: 150, marginBottom: 8 }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{ width: 100, marginBottom: 8 }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{ width: 180, marginBottom: 8 }}
        />
      </div>

      {/* Buttons Section */}
      <div className="sklton-buttons">
        <Skeleton.Button
          active
          size="small"
          style={{ width: 60, marginRight: 8 }}
        />
        <Skeleton.Button active size="small" style={{ width: 60 }} />
      </div>
    </div>
  );
};

export default AdminTurfsSklton;
