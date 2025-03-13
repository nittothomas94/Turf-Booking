import './button.css';

const Button = ({
  text = 'Click',
  width,
  height,
  padding,
  fontsize,
  fontwaight,
  borderradius,
  className,
  onclick,
  backgroundcolor,
  color,
  style,
}) => {
  return (
    <div className="button">
      <button
        style={{
          text: text,
          width: width,
          height: height,
          padding: padding,
          fontSize: fontsize,
          fontWeight: fontwaight,
          borderRadius: borderradius,
          backgroundColor: backgroundcolor,
          color: color,
          style: style,
        }}
        className={className}
        onClick={onclick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
