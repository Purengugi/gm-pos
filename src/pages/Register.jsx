import React from 'react'
import { Button, Col, Form, Input, Row, message } from 'antd';
import '../resources/authentication.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

export default function Register() {
  const navigate= useNavigate()
    const onFinish=(values)=>{
        // console.log(values)
        axios.post('/api/users/register', values).then((res)=>{
          message.success('Registration successful, please wait for verification')
        }).catch(()=>{
          message.error('Something went wrong')
        })
    }
    
    useEffect(()=>{
      if(localStorage.getItem('pos-user'))
      navigate('/home')
    }, [])

  return (
    <div className='authentication'>
        <Row>
            <Col lg={8} xs={22}>
            <Form
        initialValues={''}
        layout='vertical' onFinish={onFinish}>
            <h1><b>GM POS</b></h1>
            <hr />
            <h3>Register</h3>
          <Form.Item name='name' label='Name'>
            <Input placeholder='Name'/>
          </Form.Item>
          <Form.Item name='userId' label='User ID'>
            <Input placeholder='User Id'/>
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password' placeholder='Your Password'/>
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center">
            <Link to='/login'>Already Registered ? Click Here To Login</Link>
            <Button className='bgbutton' htmlType='submit'>Register</Button>
          </div>
        </Form>
            </Col>
        </Row>

    </div>
  )
}

