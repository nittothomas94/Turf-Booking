import './Input.css';

const Input = ({
  type,
  placeholder,
  label,
  classname,
  onChange,
  onClick,
  value,
  id,
}) => {
  return (
    <div className="input">
      <h4>{label}</h4>
      <input
        type={type}
        placeholder={placeholder}
        className={classname}
        onChange={onChange}
        onClick={onClick}
        value={value}
        id={id}
      />
    </div>
  );
};

export default Input;
