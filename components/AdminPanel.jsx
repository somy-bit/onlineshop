import React from 'react'


const AdminPanel = ({ orders }) => {
  console.log('order................',orders)
  return (
    <div className='flex flex-1 h-screen  py-24 bg-gray-200 rounded-lg w-full'>
      <div className='grid grid-cols-5 w-full text-center h-8 mx-4 border-b-2 border-gray-500 '>
        <div>date</div>
        <div>user</div>
        <div>order</div>
        <div>total price</div>
        <div>status</div>

      </div>

      {
        orders?.map((order) => {
          <div className='grid grid-cols-4 w-full text-center h-8 mx-4 border-b-2 border-gray-500 '>
            <div>{order._createdAt}</div>
            <div>{order.customer.name}</div>
            <div>{order.total}</div>
            <div>{order.order[0].product_name}</div>
            <div>{order.status}</div>
          </div>
        })
      }

    </div>
  )
}

export default AdminPanel

