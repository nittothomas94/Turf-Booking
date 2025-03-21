import './BookedCardSklton.css';
import { Skeleton } from 'antd';

const BookedCardSklton = () => {
  return (
    <div className="booked-cardSklton">
      {/* Column 1: Image */}
      <div className="sklton-image">
        <Skeleton.Image style={{ width: 80, height: 80 }} />
      </div>

      <div style={{ width: 20 }}>
        <Skeleton.Input active size="small" style={{ marginBottom: 0 }} />
      </div>
      <div style={{ width: 20 }}>
        <Skeleton.Input active size="small" style={{ marginBottom: 8 }} />
      </div>
      <div style={{ width: 20 }}>
        <Skeleton.Input active size="small" style={{ marginBottom: 8 }} />
      </div>
      <div style={{ width: 20 }}>
        <Skeleton.Input active size="small" />
      </div>

      <div className="sklton-button">
        <Skeleton.Button active style={{ width: 80, height: 40 }} />
      </div>
    </div>
  );
};

export default BookedCardSklton;
