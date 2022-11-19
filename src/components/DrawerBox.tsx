import { Alert, Button, TextField } from '@mui/material'
import { DatePicker, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
import React,{useEffect, useRef, useState} from 'react'
import {DateTime} from 'luxon'
import styled from 'styled-components'
import qs from 'qs'
import axios from 'axios'
interface propType{
    type:number
    setDrawOpen:Function
}

interface record{
    id?:number
    begin_time?:string|null|DateTime
    end_time?:string|null|DateTime
    date?:string|null|DateTime
    person?:string
    detail?:string
    type:string
}

const DrawerRoot=styled.div`
    @media (min-width: 768px) {
        width:30vw;
        display:flex;
        flex-direction:column;
    }
    @media (max-width: 767px) {
        height:50vh;
        display:flex;
        flex-direction:column;
    }
`
const DrawerTitle=styled.div`
margin:20px 0;
display:flex;
justify-content:center;
width:100%;
font-size:32px;
`
const DrawerRow=styled.div`
display:flex;
flex-direction:row;
width:100%;
margin-top:10px;
margin-bottom:10px;
`
const DrawerInnerA=styled.div`
width:40%;
display:flex;
justify-content:center;
align-items:center;
`
const DrawerInnerB=styled.div`
width:60%;
display:flex;
justify-content:start;
align-items:center;
`
const DrawerFooter=styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
margin-top:10px;
margin-bottom:30px;
`

const DrawerBox = (prop:propType) => {
    const [result,setResult]=useState(<div/>)
    const [record,setRecord]=useState<record>({
        begin_time:DateTime.local(),
        end_time:DateTime.local(),
        date:DateTime.local(),
        person:"",
        detail:"",
        type:""
    })
    useEffect(()=>{
        setRecord({...record,type:prop.type.toString()})
    },[prop.type])

  return (
      <DrawerRoot>
          <DrawerTitle>新建预约</DrawerTitle>
          <DrawerRow>
              <DrawerInnerA><b>预约人:</b></DrawerInnerA>
              <DrawerInnerB><TextField label="请输入预约人" value={record.person} onChange={value=>setRecord({...record,person:value.target.value})}></TextField></DrawerInnerB>
              {/* <Input id="person" onBlur={(e)=>{setRecord({...record,person:e.target.value});e.target.value=record.person}} /></DrawerInnerB> */}
          </DrawerRow>
          <DrawerRow>
              <DrawerInnerA><b>预约日期</b></DrawerInnerA>
              <DrawerInnerB>
                  <DatePicker
                    label="预约日期"
                    inputFormat="yyyy-MM-dd"
                    value={record.date}
                    onChange={(value)=>setRecord({...record,date:value})}
                    renderInput={(params) => <TextField {...params}/>}
                    />
                </DrawerInnerB>
          </DrawerRow>
          <DrawerRow>
              <DrawerInnerA><b>开始时间</b></DrawerInnerA>
              <DrawerInnerB>
              <TimePicker
                label="开始时间"
                value={record.begin_time}
                ampm={false}
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                onChange={value=>setRecord({...record,begin_time:value})}
                renderInput={(params) => <TextField {...params} />}
                />
                </DrawerInnerB>
          </DrawerRow>
          <DrawerRow>
              <DrawerInnerA><b>结束时间</b></DrawerInnerA>
              <DrawerInnerB>
              <TimePicker
                label="结束时间"
                value={record.end_time}
                ampm={false}
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                onChange={(value)=>setRecord({...record,end_time:value})}
                renderInput={(params) => <TextField {...params} defaultValue={""} />}
                />
                </DrawerInnerB>
          </DrawerRow>
          <DrawerRow>
              <DrawerInnerA><b>预约事项</b></DrawerInnerA>
              <DrawerInnerB><TextField label="请输入预约事项" value={record.detail} onChange={value=>setRecord({...record,detail:value.target.value})}></TextField></DrawerInnerB>
          </DrawerRow>
          {result}
          <DrawerFooter>
              <Button style={{width:"70%"}} variant="contained" onClick={()=>{
                   axios.post("https://read.eziosweet.cn/api/createNewBlock",qs.stringify({
                       ...record,
                       begin_time:record.begin_time?.toString(),
                       date:record.date?.toString(),
                       end_time:record.end_time?.toString()
                   }))
                   .then(({data})=>{
                       let ok= parseInt(data.ok)
                       switch(ok){
                           case 1:
                               setResult(<Alert severity="success">预约成功</Alert>)
                               setTimeout(()=>{
                                   prop.setDrawOpen()
                                   window.location.reload()
                               },2000)
                               break
                           case 2:
                               setResult(<Alert severity="error">该时间段已有别的预约</Alert>)
                               break
                           case 3:
                               setResult(<Alert severity="error">预约人或预约事项不能为空</Alert>)
                               break
                       }
                   })
              }}>提交</Button>
          </DrawerFooter>
      </DrawerRoot>
  )
}

export default DrawerBox