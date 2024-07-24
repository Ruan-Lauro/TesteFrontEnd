import React, { ChangeEvent, useEffect, useState } from 'react';
import "./RegisterOnu.css"
import { createOnu, useAddOnu } from '../../hooks/addONU';
import Buttons from '../../componentes/Buttons/Buttons';
import Select from '../../componentes/select/Select';
import { useNavigate } from "react-router-dom"

const RegisterOnu: React.FC = () => {

  const [fileHuawei,setFileHuawei] = useState<File>()
  const [fileZetOne,setFileZetOne] = useState<File>()
  const [fileZetTwo,setFileZetTwo] = useState<File>()
  const [nameFile, setNameFile] = useState("Upload Huawei")
  const [nameFileOne, setNameFileOne] = useState("Upload ZTE One")
  const [nameFileTwo, setNameFileTwo] = useState("Upload ZTE Two")
  const list = ["HUAWEI", "ZTE"]
  const [selectFile, setSelectFile] = useState("HUAWEI")
  const {authenticationAddO} = useAddOnu()
  
  const [textErro, setTextErro] = useState("")
  const navigate = useNavigate()

  const HandleChanges = {
    handleHuawei: (e: ChangeEvent<HTMLInputElement>) => {
      setFileHuawei(e.target.files?.[0]);
    },
    handleZetOne: (e: ChangeEvent<HTMLInputElement>) => {
      setFileZetOne(e.target.files?.[0]);
    },
    handleZetTwo: (e: ChangeEvent<HTMLInputElement>) => {
      setFileZetTwo(e.target.files?.[0]);
    },
  };




  useEffect(()=>{
    if(fileHuawei){
      setNameFile(fileHuawei.name)
    }
    
    if(fileZetOne){
      setNameFileOne(fileZetOne.name)
    }
    
    if(fileZetTwo){
      setNameFileTwo(fileZetTwo.name)
    }
  },[fileHuawei, fileZetOne, fileZetTwo])

  const authenticationOnu = () =>{

    if(selectFile=="HUAWEI"){
      if(fileHuawei && fileHuawei !== undefined){
       
       if(fileHuawei.type == "text/plain"){
        const Onu:createOnu = {
          type: "Huawei",
          file: fileHuawei
        }
        const result = authenticationAddO(Onu)
        result.then(valueN =>{
          if(valueN === "Onu created successfully."){
            setTextErro("Sent with success!")
            navigate("/SeeOnu")
          }else{
            if(valueN == "user erro"){
              
              setTextErro("Problem file")
            }
          }
        })
       }else{
        setTextErro("File is missing!")
       }
      }else{
        setTextErro("File is missing!")
      }
    }else if(selectFile =="ZTE"){
      
      if(fileZetOne && fileZetTwo){
        if(fileZetOne.type == "text/plain" && fileZetTwo.type == "text/plain"){
          const Onu:createOnu = {
            type: "ZTE",
            dataOne:fileZetOne,
            dataTwo: fileZetTwo
          }
          const result = authenticationAddO(Onu)
          result.then(valueN =>{
            if(valueN === "Onu created successfully."){
              setTextErro("Sent with success!")
              navigate("/SeeOnu")
            }else if(valueN == "erro data empty"){
              setTextErro("Your data is empty")
            }else{
              if(valueN == "user erro"){
               
                setTextErro("You are sending the same files")
              }
            }
          })
        }else{
          setTextErro("File(s) is not txt")
        }
      }else{
      
        setTextErro("File is missing!")
      }
    }
  }

  return (
    <main className='mainRegister'>
       <section className='sectionRegister'>
        <h1 className='h1Register'>Register <span style={{color:"#1a1a1a"}}>OLT</span></h1>
        <p className='inforRegister'>Here you can upload two types of files, both ZTE and Huawei, the Huawei which only has one file and the ZTE which needs two.</p>
        <div className='divSelectRegister' style={{display:"flex"}}>
        {list.map(value=>(  
          <Select children={value} key={value} authentication={()=>{
            setSelectFile(value)
            setFileHuawei(undefined)
            setFileZetOne(undefined)
            setFileZetTwo(undefined)
            setNameFile("Upload Huawei")
            setNameFileOne("Upload ZTE One")
            setNameFileTwo("Upload ZTE Two")
          }} selected={selectFile == value}></Select>
        ))}
        </div>
        {selectFile == "HUAWEI"?(
          <div style={{display:"flex", flexDirection:"column", width:"100%", marginBottom:"2rem"}}>
              <label htmlFor="arquivo" className='labelRegister'>{nameFile}</label>
              <input type='file' accept='.txt' name='arquivo' id='arquivo' style={{display:"none"}} onChange={HandleChanges.handleHuawei}></input>
          </div>
        ):(
          <div style={{ display:"flex", flexDirection:"column", width:"100%", marginBottom:"2rem"}}>
            <label htmlFor="arquivoOne" className='labelRegister' id='labelOne'>{nameFileOne}</label>
            <input type='file' accept='.txt' name='arquivoOne' id='arquivoOne' style={{display:"none"}} onChange={HandleChanges.handleZetOne} ></input>

            <label htmlFor="aT" className='labelRegister'>{nameFileTwo}</label>
            <input type='file' accept='.txt' name='aT' id='aT' style={{display:"none"}} onChange={HandleChanges.handleZetTwo}></input>
          </div>
        )}
        <div className='divButtonRegister'>
        <Buttons authentication={()=>{
          authenticationOnu()
        }} type='button'>Register</Buttons> 
        <Buttons authentication={()=>{
           navigate("/SeeOnu")
        }} type='button'>View</Buttons>
        </div>
        <p className='erroText'>{textErro}</p>
       </section>
    </main>
  );
};

export default RegisterOnu;
