import React from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

export default function Item({item}) {
  const dispatch = useDispatch()
  const addtocart = ()=>{
    dispatch({type :'addtocart', payload: {...item, quantity:1}})
  }
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt="" height={100} width={100}/>
      <h4 className='price'><b>Price : </b>{item.price} $</h4>
      <div className="d-flex justify-content-end">
       <Button onClick={()=>addtocart()}>Add To Cart</Button>
      </div>
    </div>
  )
}