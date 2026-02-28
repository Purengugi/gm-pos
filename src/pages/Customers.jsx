import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import  {EyeOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import { useReactToPrint } from 'react-to-print';

export default function Customers() {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);

  const getAllBills=()=>{
    axios.get(`/api/bills/get-all-bills`).then((response)=>{
      const data=response.data
        data.reverse()
      setBillsData(data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const columns=[
    {
        title:'Customer',
        dataIndex:'customerName',
    },
    {
        title:'Phone Number',
        dataIndex:'customerPhoneNumber',
    },
    {
      title:'Created On',
      dataIndex:'createdAt',
      render:(value)=><span>{value.toString().substring(0,10)}</span>
    },
];

  useEffect(()=>{
  getAllBills()
  },[])



  return (
    <DefaultLayout >
      <div className="d-flex justify-content-between">
        <h3 className='bgtitle'>Customers</h3>
        
      </div>
      <Table columns={columns} dataSource={billsData} bordered/>
      
    </DefaultLayout>
  )
}
