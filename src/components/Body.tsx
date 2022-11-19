import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Button, Drawer, TextField, useMediaQuery } from '@mui/material'
import DrawerBox from './DrawerBox'
import { TimePicker } from '@mui/x-date-pickers'
import Nanami from './Nanami'

interface propType{
  title:number
}
const BodyRoot=styled.div`
    @media (min-width: 768px){
      width:80vw;
      margin-left:10vw;
      margin-top: 20px;
      background-color:#eee;
      display:flex;
      flex-direction:column;
    }
    @media (max-width:767px) {
      width:100vw;
      margin-top: 20px;
      background-color:#eee;
      display:flex;
      flex-direction:column;
    }
  `
const BodyTitle=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  &>:nth-child(1){
    width: 20%;
  }
  &>:nth-child(2){
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
`


const Body = ({title}:propType) => {
  let titleReal
  const [drawOpen,setDrawOpen]=useState<boolean>(false)

  const handleClick=()=>{
    setDrawOpen(true)
  }
  
  switch(title){
    case 1:
      titleReal="六楼公房"
      break;
    case 2:
      titleReal="实验室"
      break;
    default:
      titleReal="会议室"
      break;
  }
  const isWide=useMediaQuery('(min-width:768px)')
  const [a,setA]=useState<string|null>("")
  return (
    <Fragment>
      <BodyRoot>
        <BodyTitle>
          <div></div>
          <div><div>{isWide?"IBPE":""}{titleReal}预约表</div></div>
          <div><Button style={{width:"100%"}} variant="contained" onClick={handleClick}>新建{isWide?"一个预约":""}</Button></div>
        </BodyTitle>
        <Nanami item={title}/>
      </BodyRoot>
      <Drawer
        anchor={isWide?"right":"bottom"}
        open={drawOpen}
        variant="temporary"
        onClose={()=>setDrawOpen(false)}
      >
        <DrawerBox setDrawOpen={setDrawOpen} type={title}/>
    </Drawer>
    </Fragment>
    
  )
}

export default Body