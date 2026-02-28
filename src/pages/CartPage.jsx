import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Table, Form, Select,message,Input } from 'antd'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function CartPage() {
    const {cartItems}=useSelector(state=>state.rootReducer)
    const [subTotal,setSubTotal]=useState(0)
    const [billChargeModal,setBillChargeModal]=useState(false)
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const increaseQuantity=(record)=>{
        dispatch({type: 'updateCart', payload: {...record , quantity: record.quantity+1}})
    }
    const decreaseQuantity=(record)=>{
        if(record.quantity!==1){
        dispatch({type: 'updateCart', payload: {...record , quantity: record.quantity-1}})
    }
    }
    
    const columns=[
        {
            title :'Name',
            dataIndex: 'name'
        },
        {
            title:'Image',
            dataIndex:'image',
            render: (image,record)=><img src={image} alt='' height={60} width={60}/>
        },
        {
            title:'Price',
            dataIndex:'price',
        },
        {
            title:'Quantity',
            dataIndex:'quantity',
            render:(id, record)=><div>
                <PlusCircleOutlined className='mx-3 bgtitle' onClick={()=>increaseQuantity(record)}/>
                <b>{record.quantity}</b>
                <MinusCircleOutlined className='mx-3 bgtitle' onClick={()=>decreaseQuantity(record)}/>
                </div>
        },
        {
            title:'Action',
            dataIndex:'_id',
            render: (id, record)=> <DeleteOutlined className='bgred' onClick={()=>dispatch({type:"deleteFromCart", payload: record})}/>
        }
    ];
    useEffect(()=>{
        let temp =0;
        cartItems.forEach(item => {
            temp = temp + (item.price * item.quantity)
        });
        setSubTotal(temp)
    },[cartItems])

    const onFinish=(values)=>{
        const reqObject ={
            ...values,
            subTotal,
            cartItems,
            tax:Number(((subTotal / 100) * 10).toFixed(2)),
            totalAmount : Number(subTotal + Number(((subTotal / 100) * 10).toFixed(2))),
            userId : JSON.parse(localStorage.getItem('pos-user'))._id
        }
        // console.log(reqObject)
        axios.post('/api/bills/charge-bill', reqObject).then(()=>{
            message.success('Bill charged sucessfully')
            navigate('/bills')
        }).catch(()=>{
            message.error('Something went wrong')
        })
    }
return (
    <DefaultLayout>
      <h3 className='bgtitle'>Cart</h3>
      <Table columns={columns} dataSource={cartItems} bordered/>
      <hr />
      <div className='d-flex justify-content-end flex-column align-items-end'>
        <div className='subtotal'>
            <h3>Sub Total : <b>{subTotal} $/- </b></h3> 
        </div>
        <Button className='btnbg' onClick={()=>setBillChargeModal(true)}>Charge Bill</Button>
      </div>
      <Modal title='Charge Bill' visible= {billChargeModal} footer={false} onCancel={()=>setBillChargeModal(false)}>
      <Form 
        initialValues={''}
        layout='vertical' onFinish={onFinish}>

          <Form.Item name='customerName' label='Customer Name'>
            <Input placeholder='Customer Name'/>
          </Form.Item>

          <Form.Item name='customerPhoneNumber' label='Phone Number'>
            <Input placeholder='Phone Number'/>
          </Form.Item>

          <Form.Item name='paymentMode' label='Payment Mode' >
           <Select placeholder='Payment Mode'>
            <Select.Option value='cash'>Cash</Select.Option>
            <Select.Option value='card'>Card</Select.Option>
           </Select>
          </Form.Item>
          <div className='charge-bill-amount '>
            <h5 className='bgtitle'>SubTotal : <b>{subTotal}</b></h5>
            <h5 className='bgtitle'>Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b></h5>
            <hr />
            <h3>Grand Total : <b>{subTotal + ((subTotal / 100) * 10)}</b></h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button className='bgbutton' htmlType='submit'>Charge Bill</Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  )
}
