import './CardSkelton.css';
import { Skeleton } from 'antd';

const CardSklton = () => {
  return (
    <div className="main-card-sklton">
      <div className="image-sklton">
        <Skeleton.Image style={{ width: 150, height: 150 }} />
      </div>
      <div className="text-sklton">
        <Skeleton.Input active style={{ width: 200, marginBottom: 8 }} />
        <Skeleton.Input active style={{ width: 180, marginBottom: 8 }} />
        <Skeleton.Input active style={{ width: 150 }} />
      </div>
    </div>
  );
};

export default CardSklton;
