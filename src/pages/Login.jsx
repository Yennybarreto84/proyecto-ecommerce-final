import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const resetForm = () => {
    reset()
  }

  const submit = (data) => {
    // console.log(data) 
    resetForm();
    Login(data)
    navigate('/')
  }

  const Login = (data) => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
    .then((res) => {
      // console.log(res.data)
      localStorage.setItem('token', res?.data?.token)
      //cierre de sesion
      //localStorage.clear()
    })
    .catch((error) => {
      if(error.response?.status === 401){
        alert('Usuario o Contraseña Incorrectos')
      }else{
      console.log(error)
      }
    })
  }
  return (
    <Form
    style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #000' }}
    onSubmit={handleSubmit(submit)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"{...register("password")} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default Login
