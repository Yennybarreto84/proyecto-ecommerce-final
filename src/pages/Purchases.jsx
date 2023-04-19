import axios from 'axios'
import { useEffect, useState } from 'react'
import getConfig from '../helpers/getConfig'

const Purchases = () => {

  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
    .then((res) => {
      console.log(res?.data)
      setPurchases(res?.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div>
    <table>
      <thead>
      <tr><h1> my Purchases</h1></tr>
      </thead>
          <ul>
            {
              purchases.map((purchase) => (
                <li key={purchase.id}>
                  <br></br>
                  <td>{purchase.id}</td>
                  <td>{purchase.createdAt}</td>
                  <td>{purchase.total}</td>
                  <td>{purchase.status}</td>
                </li>
              ))
              }
          </ul>     
    </table>
    </div>
  )
}

export default Purchases
