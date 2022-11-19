import { Button, Modal, Pagination, useMediaQuery, Box, Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios'
import { DateTime } from 'luxon'
import qs from 'qs'
import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'

const NanamiRoot=styled.div`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
`

  
const NanamiTable=styled.table`
    border-collapse: collapse;
    margin-top: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        width: 90%;
        margin-left: 5%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
    td{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #cad9ea;
        color: #666;
        height: 40px;
    }
    th{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #cad9ea;
        color: #666;
        height: 40px;
    }
    thead{
        th{
            background-color: #CCE8EB;
        }
    }
    tr:nth-child(odd){
        background: #fff;
    }
    tr:nth-child(even){
        background-color:#F5FAFA;
    }
`
const NanamiList=styled.tr`
    @media (min-width: 768px) {
        width: 92%;
        margin-left: 4%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    >:nth-child(1){
    width: 15%;
    display: flex;
    justify-content: center;
    }
    >:nth-child(2){
        width: 25%;
        display: flex;
        justify-content: center;
    }
    >:nth-child(3){
        width: 20%;
        display: flex;
        justify-content: center;
    }
    >:nth-child(4){
        width: 20%;
        display: flex;
        justify-content: center;
    }
    >:nth-child(5){
        width: 20%;
        display: flex;
        justify-content: center;
    }
`

const NanimiPage=styled.div`
    display:flex;
    justify-content:center;
    margin-top: 40px;
    margin-bottom: 40px;
`
const NanamiDialog=styled.div`
    display: flex;
    flex-direction: column;
`
interface propType{
    item:number

}

interface record{
    id?:number
    begin_time:string
    end_time:string
    date:string
    person?:string
    detail?:string
    type:number
}

const Nanami = ({item}:propType) => {
    const isWide=useMediaQuery('(min-width:768px)')
    const [page,setPage]=useState<number>(1)
    const [list,setList]=useState<record[]>([{
        id:1,
        date:"",
        begin_time:"",
        end_time:"",
        person:"",
        detail:"",
        type:item
    }])
    const [count,setCount]=useState<number>(0)
    const [open, setOpen] = useState<boolean>(false);
    const [del,setDel]=useState<boolean>(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        axios.post("https://read.eziosweet.cn/api/deleteById",qs.stringify({id:nanami.id})).then((res)=>{
        axios.get("https://read.eziosweet.cn/api/getTable?"+qs.stringify({type:item,page:page})).then(res=>{
              handleClose()
              setList(res.data)
        })
        axios.get("https://read.eziosweet.cn/api/getCount?"+qs.stringify({type:item})).then(res=>{
            setCount(res.data)
        })
    })
    };
    const [nanami,setNanami] = useState<record>({
        id:1,
        date:"",
        begin_time:"",
        end_time:"",
        person:"",
        detail:"",
        type:1
    })
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isWide?400:250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const handleClose=()=>{
        setOpen(false)
        setDel(false)
    }
    useEffect(()=>{
        axios.get("https://read.eziosweet.cn/api/getTable?"+qs.stringify({type:item,page:page})).then(res=>{
          setList(res.data)
        })
        axios.get("https://read.eziosweet.cn/api/getCount?"+qs.stringify({type:item})).then(res=>{
          setCount(res.data)
        })
      },[item,page])
  return (
      <Fragment>
          <NanamiRoot>
            <NanamiTable>
            <NanamiList className='nanami-list'>
                <th>预约人</th>
                <th>预约日期</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>详情</th>
            </NanamiList>
            {Array.from(list).map(iten=>{
            return <NanamiList className='nanami-list' key={iten.id}>
                <td>{iten.person}</td>
                <td>{DateTime.fromISO(iten.date).toFormat("yyyy-MM-dd")}</td>
                <td>{DateTime.fromISO(iten.begin_time).toFormat("HH:mm") }</td>
                <td>{DateTime.fromISO(iten.end_time).toFormat("HH:mm")}</td>
                <td><Button onClick={()=>{setOpen(true);setNanami(iten)}} variant={isWide?"outlined":"text"}>{isWide?"查看":""}详情</Button></td>
            </NanamiList>})}
            </NanamiTable>
            
            
        </NanamiRoot>
        <NanimiPage>
            <Pagination count={count%8===0?parseInt((count/8).toString()): parseInt((count/8).toString())+1} showFirstButton showLastButton page={page} onChange={(e,value)=>setPage(value)} variant="text" color="primary" />
        </NanimiPage>
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
            <NanamiDialog>
            <div><b>预约人:</b>{nanami.person}</div>
            <div><b>预约日期:</b>{DateTime.fromISO(nanami.date).toFormat("yyyy-MM-dd")}</div>
            <div><b>预约时间:</b>{DateTime.fromISO(nanami.begin_time).toFormat("HH:mm") +"到"+DateTime.fromISO(nanami.end_time).toFormat("HH:mm") }</div>
            <div><b>预约事项:</b>{nanami.detail}</div>
            <FormControlLabel control={<Checkbox checked={del} onChange={(e)=>setDel(!del)} />} label="确认删除" />
            <div>&nbsp;
            </div>
            <Button disabled={!del} variant="contained" color="error" onClick={handleClick}>删除</Button>
            </NanamiDialog>
            </Box>
        
        </Modal>
      </Fragment>
    
  )
}

export default Nanami