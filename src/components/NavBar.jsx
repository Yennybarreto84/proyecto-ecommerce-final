import React from 'react'
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Cart from './Cart'

const NavBar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

  return (
    <>
    <Navbar bg="primary" variant="dark">
        <Container>
            <Navbar.Brand as={ Link } to='/'>
                E-Commerce
                </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={ Link } to='/login'>
                    Login
                </Nav.Link>
                {/* <Nav.Link as={ Link } to='/product/:id'>
                    Products
                </Nav.Link> */}
                <Nav.Link
                className="cart"
                onClick={() => {
                    setShow(true);
                }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                ( cart modal)
                </Nav.Link>
                <Nav.Link as={ Link } to='/purchases'>
                    Purchases
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    <Cart show={ show } handleClose={ handleClose } />
    </>
  )
}

export default NavBar
