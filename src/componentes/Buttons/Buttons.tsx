import React, { FormEvent } from 'react';
import "./Buttons.css"
interface Props {
    children: string;
    authentication?: (e: FormEvent) => Promise<void> | void;
    id?: string;
    type?:"button" | "submit" | "reset" | undefined;
}

const Buttons: React.FC<Props> = ({children, authentication, id, type}) => {

  return (
    <button className='btn' type={type} onClick={authentication} id={id}> {children}</button>
  );
};

export default Buttons;