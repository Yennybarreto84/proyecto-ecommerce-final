import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { addCartItemThunk } from "../store/slices/cart.slice"
import { useDispatch } from "react-redux"

const ProductsDetail = () => {
  const [productDetail, setProductDetail] = useState({})
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  useEffect(() => {
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
    .then((res) => {
      console.log(res?.data)
      setProductDetail(res?.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const dispatch = useDispatch()
  const addToCart = () => {
    const data = {
      quantity: quantity,
      productId: productDetail.id
    }
    dispatch(addCartItemThunk(data))
  };

  return (
    <div className='product'>
      <img src={productDetail?.images?.[1]?.url} alt={productDetail?.name} />
      <div className="detail">
      <h1>{productDetail?.name}</h1>
      <p>{productDetail?.description}</p>
      <p>{productDetail?.price}</p>
      <p>{productDetail?.stock}</p>
      <p>{productDetail?.category?.name}</p>
      <div>
        <button
        onClick={
          () => {
            if (quantity > 1) {
              setQuantity(quantity - 1)
            }else {
              setQuantity(1)
            }
          }
        }
        >
          -
        </button>
        <span>{quantity}</span>
        <button
        onClick={
          () => {
          setQuantity(quantity + 1)
          }
        }
        >
          +
        </button>
      </div>
      <button
      onClick={addToCart}
      >Add to Cart</button>
      </div>
    </div>
  )
}
export default ProductsDetail
