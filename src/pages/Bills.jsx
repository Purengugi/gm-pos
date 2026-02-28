import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import  {EyeOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import { useReactToPrint } from 'react-to-print';

export default function Bills() {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [printBillModal, setPrintBillModal]=useState(false)
  const [selectBill,setSelectBill]=useState(null)
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
        title :'Id',
        dataIndex: '_id'
    },
    {
        title:'Customer',
        dataIndex:'customerName',
    },
    {
        title:'SubTotal',
        dataIndex:'subTotal',
    },
    {
      title:'Tax',
      dataIndex:'tax',
    },
    {
        title:'Total',
        dataIndex:'totalAmount',
      },
    {
        title:'Action',
        dataIndex:'_id',
        render: (id, record)=> <div className='d-flex'>
          <EyeOutlined  className='mx-2 bgtitle' onClick={()=>{
            setSelectBill(record)
            setPrintBillModal(true)
          }}/>
        </div>
    }
];
const cartcolumns=[
    {
        title :'Name',
        dataIndex: 'name'
    },
    {
        title:'Price',
        dataIndex:'price',
    },
    {
        title:'Quantity',
        dataIndex:'quantity',
        render:(id, record)=><div>
            <b>{record.quantity}</b>
            </div>
    },
    {
        title:'Total',
        dataIndex:'_id',
        render:(id, record)=><div>
            <b>{record.quantity * record.price}</b>
            </div>
    },
    
];
  useEffect(()=>{
  getAllBills()
  },[])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout >
      <div className="d-flex justify-content-between">
        <h3 className='bgtitle'>Bills</h3>
        
      </div>
      <Table columns={columns} dataSource={billsData} bordered/>
      {printBillModal && (
        <Modal onCancel={()=>{
          setPrintBillModal(false)
        }} visible={printBillModal} 
        title={`Bill Details`} 
        footer={false}
        width={800}
        >
        <div className='bill-modal p-2' ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
                <div>
                    <h2>GM Market</h2>
                </div>
                <div>
                    <p>San Francisco</p>
                    <p>972 Mission St</p>
                    <p>United States</p>
                </div>
            </div>
            <div className="bill-details my-2">
                <p><b>Name  </b> : {selectBill.customerName}</p>
                <p><b>Phone Number  </b> : {selectBill.customerPhoneNumber}</p>
                <p><b>Date  </b> : {selectBill.createdAt.toString().substring(0,10)}</p>
            </div>
            <Table dataSource={selectBill.cartItems} columns={cartcolumns} pagination={false}/>

            <div className='dot-border my-2 pb-2'>
                <p><b>SubTotal</b> : {selectBill.subTotal}</p>
                <p><b>Tax</b> : {selectBill.tax}</p>
            </div>
            <div className='my-2'>
                <h3>Grand Total : {selectBill.totalAmount}</h3>
            </div>
            <div className="dot-border"></div>
            <div className='text-center'>
                <p>Thanks</p>
                <p>Visit Again :)</p>

            </div>
        </div>
        <div className="d-flex justify-content-end">
            <Button className='bgbutton' onClick={handlePrint}>Print Bill</Button>
        </div>
      </Modal>
      )}
    </DefaultLayout>
  )
}

