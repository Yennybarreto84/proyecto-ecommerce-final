import axios from 'axios'
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductsThunk, filterCategoriesThunk, filterNameThunk } from '../store/slices/products.slice'

const Home = () => {

  const products = useSelector(state => state.products)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
    .then((res) => {
      // console.log(res?.data)
      setCategories(res?.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])
  return (
    <div>
      <Container>
        <Row className='py-3'>
          {
            categories.map((category) => (
              <Col key={category?.id}>
                <Button
                className='w-100'
                onClick={() => dispatch(filterCategoriesThunk(category?.id))}
                >{category?.name}
                </Button>
              </Col>
            ))
          }
          <Col>
                <Button
                className='w-100'
                onClick={() => dispatch(getProductsThunk())}
                >All Products
                </Button>
              </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Search Product by Name'
                aria-label='Products Name'
                aria-describedby='basic-addon2'
                value={ inputSearch }
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <Button variant='outline-secondary' id='button-addon2'
              onClick={() => dispatch(filterNameThunk(inputSearch))}
              >
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} className='py-3'>
          {products.map((product) => (
            <Col key={product?.id}>
              <Card className='my-3' style={{height: '1100px'}}>
                <Card.Img variant='top' src={product?.images[0]?.url}
                style={{height: '400px'}} 
                />
                <Card.Body>
                  <Card.Title>{product?.title}</Card.Title>
                  <Card.Text>
                    {product?.description}
                  </Card.Text>
                  <Card.Text>
                    {product?.price}
                  </Card.Text>
                  <Card.Text>
                    {product?.brand}
                  </Card.Text>
                  <Button 
                  as={Link}
                  to={`/products/${product?.id}`}
                  variant='primary'>Product Detail</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

        </Row>
      </Container>

    </div>

  )
}

export default Home
