import React from 'react';
import "./seeOnu.css"
interface Props {
    id: number | string,
    slot: number | string;
    port: number | string;
    ont_id: string;
    sn: string;
    state: string | null;
    origin: string;
}

const SeeOnuElement: React.FC<Props> = ({id, ont_id, port, slot, sn, state, origin}) => {

  return (
    <main className='mainSeeOnuElement'>
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{id}</p></div>
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{ont_id}</p></div>
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{port}</p></div>
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{slot}</p></div>      
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{sn}</p></div>
        <div className='divSeeOnuElement'><p className='pSeeOnuElement'>{state}</p></div>
        <div className='divSeeOnuElement' id='divElement'><p className='pSeeOnuElement'>{origin}</p></div>
    </main>
  );
};

export default SeeOnuElement;