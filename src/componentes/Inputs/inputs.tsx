import React, { ChangeEvent } from 'react';
import "./inputs.css"
interface Props {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const Inputs: React.FC<Props> = ({name, id, onchange, placeholder, required, type}) => {

  return (
    <input 
      className="inputFile"
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onchange}
      required = {required}
    />
  );
};

export default Inputs;