import React, { ChangeEvent, useEffect, useState } from 'react';
import {onu, useGetOnu} from "../../hooks/getOnu"
import SeeOnuElement from '../../componentes/seeOnu/seeOnu';
import "./SeeOnu.css"
import { useNavigate } from "react-router-dom"
import Buttons from '../../componentes/Buttons/Buttons';

const SeeOnu: React.FC = () => {
  const list = ["select","online", "offline", "Huawei", "ZTE"]
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('');
  const [textsearch, setTextSearch] = useState("")
  const {authenticationON} = useGetOnu()
  const [listOnu, setListOnu] = useState<onu[]>()

  const HandleChanges = {
    handleText: (e: ChangeEvent<HTMLInputElement>) => {
      setTextSearch(e.target.value);
    },
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    },
   
  };

  useEffect(()=>{
    const list = authenticationON()
    list.then(value=>{
      if(value.length!== 0 && Array.isArray(value)){
      
        setListOnu(value)
      }
    })
  },[])



  useEffect(()=>{
    setListOnu([])
    const list = authenticationON()
    list.then(value=>{
      if(value.length!== 0 && Array.isArray(value)){
        if(selectedOption !== ""){
      
          if(selectedOption == "online"){
            setListOnu([])
            const listFilter = value.filter(elem => elem.state =="online")
            if(textsearch !== ""){
              listFilter.map(valueMap=>{
                if(valueMap.id == parseInt(textsearch) || valueMap.ont_id.includes(textsearch) || valueMap.port == parseInt(textsearch) || valueMap.slot == parseInt(textsearch) || valueMap.sn.includes(textsearch)){
                
                  setListOnu(prevList => [...prevList!, valueMap])
                }
              })
            }else{
              setListOnu(listFilter)
            }
          }else if(selectedOption == "offline"){
            setListOnu([])
            const listFilter = value.filter(elem => elem.state =="offline")
            if(textsearch !== ""){
              listFilter.map(valueMap=>{
                if(valueMap.id == parseInt(textsearch) || valueMap.ont_id.includes(textsearch) || valueMap.port == parseInt(textsearch) || valueMap.slot == parseInt(textsearch) || valueMap.sn.includes(textsearch)){
                  
                  setListOnu(prevList => [...prevList!, valueMap])
                }
              })
            }else{
              setListOnu(listFilter)
            }
          }else if(selectedOption == "Huawei"){
            setListOnu([])
            const listFilter = value.filter(elem => elem.origin =="Huawei")
            if(textsearch !== ""){
              listFilter.map(valueMap=>{
                if(valueMap.id == parseInt(textsearch) || valueMap.ont_id.includes(textsearch) || valueMap.port == parseInt(textsearch) || valueMap.slot == parseInt(textsearch) || valueMap.sn.includes(textsearch)){
            
                  setListOnu(prevList => [...prevList!, valueMap])
                }
              })
            }else{
              setListOnu(listFilter)
            }
          }else if(selectedOption == "ZTE"){
            setListOnu([])
            const listFilter = value.filter(elem => elem.origin =="ZTE")
            if(textsearch !== ""){
              listFilter.map(valueMap=>{
                if(valueMap.id == parseInt(textsearch) || valueMap.ont_id.includes(textsearch) || valueMap.port == parseInt(textsearch) || valueMap.slot == parseInt(textsearch) || valueMap.sn.includes(textsearch)){
                
                  setListOnu(prevList => [...prevList!, valueMap])
                }
              })
            }else{
              setListOnu(listFilter)
            }
          }else{
            if(textsearch !== ""){
              setListOnu([])
              value.map(valueMap=>{
                if(valueMap.id == parseInt(textsearch) || valueMap.ont_id.includes(textsearch) || valueMap.port == parseInt(textsearch) || valueMap.slot == parseInt(textsearch) || valueMap.sn.includes(textsearch)){
             
                  setListOnu(prevList => [...prevList!, valueMap])
                }
              })
            }else{
              setListOnu(value)
            }
          }
          
        }else{
          setListOnu(value)
        }
      }
    })
  },[ textsearch, selectedOption])

  return (
    <main className='allSeeOnu'>
      <section className='sectionSeeOnu'>
          <header className='headerSeeOnu'>
              <h2>SAVED INFORMATION</h2>
              <section>
              <input type='search' onChange={HandleChanges.handleText} value={textsearch} placeholder='Search'></input>
              <select value={selectedOption} onChange={HandleChanges.handleSelectChange}>
                {list.map(value=>(
                   <option value={value}>{value}</option>
                ))}
              </select>
              <Buttons authentication={()=>{
                 navigate("/")
              }} type='button'>Return</Buttons>
              </section>
          </header>
          <main className='mainSeeOnu'>
          <SeeOnuElement id={"ID"} ont_id={"ONT_ID"} port={"PORT"} slot={"SLOT"} sn={"SN"} state={"VALUE"} origin={"ORIGIN"}></SeeOnuElement>
              {listOnu?.map !== undefined?(
                <>
                   {listOnu.map(value=>(
                    <SeeOnuElement id={value.id} ont_id={value.ont_id} port={value.port} slot={value.slot} sn={value.sn} state={value.state} origin={value.origin}></SeeOnuElement>
                  ))}
                </>
              ):null}
          </main>
      </section>
    </main>
  );
};

export default SeeOnu;