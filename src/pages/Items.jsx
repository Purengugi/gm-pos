import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import  {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';

export default function Items() {

  const [itemsData, setItemsData] = useState([]);
  const [addEditModalOpen, setAddEditModalOpen]=useState(false)
  const [editItem, setEditItem] = useState(null)

  const getAllItems=()=>{
    axios.get(`/api/items/get-all-items`).then((response)=>{
      setItemsData(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  const deleteItem=(record)=>{
    axios.post(`/api/items/delete-item`, {itemId:record._id}).then((response)=>{
      message.success('Item deleted sucessfully')
      getAllItems()
    }).catch((error)=>{
      message.error('Something went wrong')
      console.log(error)
    })
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
      title:'Category',
      dataIndex:'category',
    },
    {
        title:'Action',
        dataIndex:'_id',
        render: (id, record)=> <div className='d-flex'>
          <EditOutlined className='mx-2 bgtitle' onClick={()=>{
            setEditItem(record)
            setAddEditModalOpen(true)
          }}/>
          <DeleteOutlined className='mx-2 bgred' onClick={()=>deleteItem(record)}/>
        </div>
    }
];
  useEffect(()=>{
  getAllItems()
  },[])

  const onFinish=(values)=>{
    if(editItem === null){
      axios.post(`/api/items/add-item`, values).then((response)=>{
        message.success('Item added successfully')
        setAddEditModalOpen(false)
        getAllItems()
      }).catch((error)=>{
        message.error('Something went wrong')
        console.log(error)
      })
    } else{
      axios.post(`/api/items/edit-item`, {...values, itemId:editItem._id}).then((response)=>{
        message.success('Item edited successfully')
        setEditItem(null)
        setAddEditModalOpen(false)
        getAllItems()
      }).catch((error)=>{
        message.error('Something went wrong')
        console.log(error)
      })
    }
  }

  return (
    <DefaultLayout >
      <div className="d-flex justify-content-between">
        <h3 className='bgtitle'>Items</h3>
        <Button className='bgbutton' onClick={()=>setAddEditModalOpen(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered/>
      {addEditModalOpen && (
        <Modal onCancel={()=>{
          setEditItem(null)
          setAddEditModalOpen(false)
        }} visible={addEditModalOpen} 
        title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`} footer={false}>
        <Form 
        initialValues={editItem}
        layout='vertical' onFinish={onFinish}>
          <Form.Item name='name' label='Name'>
            <Input placeholder='Name'/>
          </Form.Item>
          <Form.Item name='price' label='Price'>
            <Input placeholder='Price'/>
          </Form.Item>
          <Form.Item name='image' label='Image URL'>
            <Input placeholder='Image URL'/>
          </Form.Item>
          <Form.Item name='category' label='Category' >
           <Select placeholder='Categories'>
            <Select.Option value='fruits'>Fruits</Select.Option>
            <Select.Option value='vegetables'>Vegetables</Select.Option>
            <Select.Option value='meats'>Meats</Select.Option>
           </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button className='bgbutton' htmlType='submit'>Save</Button>
          </div>
        </Form>
      </Modal>
      )}
    </DefaultLayout>
  )
}
