import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import '../resources/Layout.css'
import { Button, Layout, Menu, theme } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const navigate= useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {cartItems} = useSelector(state=>state.rootReducer)
  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            <h3>GM  POS</h3>
        </div>
        <Menu className='menu' 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
            <Menu.Item key="/home" icon={<HomeOutlined/>}>
            <Link  className='text-decoration-none' to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item key="/cart" icon={<ShoppingCartOutlined/>}>
            <Link  className='text-decoration-none' to='/cart'>Cart</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link  className='text-decoration-none' to='/bills'>Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link  className='text-decoration-none' to='/items'>Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined/>}>
            <Link className='text-decoration-none' to='/customers'>Customers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={()=>{
              localStorage.removeItem('pos-user')
              navigate('/login')
            }}>
            <Link  className='text-decoration-none' to='/logout'>Logout</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
            margin:'0 10px' 
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='cart-count d-flex align-items-center' onClick={()=>{navigate('/cart')}}>
            <b><p className='mt-3 mr-2'>{cartItems.length}</p></b>
            <ShoppingCartOutlined className='bgtitle'/>
          </div>
        </Header>
        <Content className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '80vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;