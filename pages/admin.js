import React from 'react'
import WithAuth from '../components/WithAuth'
import AdminPanel from '../components/AdminPanel'
import { client } from '../lib/client'

const admin = ({orders}) => {
  return (
    <div>
      <AdminPanel orders={orders}/>
    </div>
  )
}

export default WithAuth(admin)

export const getServerSideProps = async () => {

  const query ='*[_type == "orders"]';

  const orders = await client.fetch(query);

  return {
    props:{orders:orders}
  }
}
