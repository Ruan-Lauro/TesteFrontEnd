import React, { FormEvent } from 'react';
import "./Select.css"

interface Props {
    children: string;
    authentication: () => void;
    selected: boolean;
}

const Select: React.FC<Props> = ({children, authentication,selected}) => {

  return (
    <div className={selected?("selectionDivS"):"selectionDiv"} onClick={()=>{
      authentication()
  }}>
      <p className='pSelect'>{children}</p>
  </div>
  );
};

export default Select;