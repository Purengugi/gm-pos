import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd';
import Item from '../components/Item';
import '../resources/items.css'

export default function HomePage() {

  const [itemsData, setItemsData] = useState([]);
  const [selectCategory,setSelectCategory] = useState('fruits')
  const Categories =[
    {
      name: 'fruits',
      imageURL: 'https://www.euroschoolindia.com/wp-content/uploads/2023/10/importance-of-eating-a-variety-of-fruits-for-kids-health-jpg.webp',
    },
    {
      name: 'vegetables',
      imageURL: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6',
    },
    {
      name: 'meats',
      imageURL: 'https://i0.wp.com/www.seriouseats.com/thmb/9wR_tCe_lp1eV0ZqK1Cmdhto0Qs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__12__20141216-cooked-steak-vicky-wasik-12028129-98b64a0c2936461b99133ae75914f22b.jpg?ssl=1',
    },
    {
      name: 'chicken',
      imageURL: 'https://www.wellplated.com/wp-content/uploads/2023/09/How-to-Bake-Chicken-Breast-Extra-Juicy.jpg',
    },
  ]
  
  const getAllItems=()=>{
    axios.get('/api/items/get-all-items').then((response)=>{
      console.log(response.data)
      setItemsData(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
  getAllItems()
  },[])

  return (
    <div className='content'>
      <DefaultLayout>
        <div className='d-flex'>
          {Categories.map((category) =>{
            return <div
            onClick={()=>setSelectCategory(category.name)} 
            className={`d-flex category ${selectCategory=== category.name && 'selectCategory'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} alt="" height={60} width={80}/>
            </div>
          })}
        </div>
        <Row gutter={20}>{itemsData.filter((i)=>i.category===selectCategory).map((item)=>{
          return <Col  xs={24} lg={6} md={12} sm={6} key={item._id}>
            <Item item={item}/>
          </Col>
        })}
        </Row>
    
      </DefaultLayout>
    
    </div>
    
  )
}
