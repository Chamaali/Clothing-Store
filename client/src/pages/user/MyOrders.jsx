import React from 'react'
import NavBar from '../../components/navigationBar/NavBar'
import Footer from '../../components/footer/Footer'
import tsetImg from '../../assets/tshirt.webp';
import { useGetOrderDetailsQuery } from '../../store/api/userApi';

function MyOrders() {
  const {data, isSuccess, isLoading, isError } = useGetOrderDetailsQuery()

  const orderData = data?.orderDetails?.orders

  if(isLoading){
    return <div className='flex items-center justify-center w-full h-[100vh]'>Loading...</div>
  }
  console.log(orderData)
  return (
    <>
    <NavBar />
      <div className='flex flex-col justify-between min-h-[92vh]  gap-10'>
        <div className='relative flex flex-col items-center gap-8 px-10 py-10'>
          <h2 className='text-3xl font-semibold'>My Orders</h2>
          <div className='p-8 border rounded-md max-sm:p-5 w-[500px] max-mdxl:w-[360px]'>
          {isSuccess && (
            <table className='w-full max-md:text-sm'>
              <tr className='border-b '>
                <th>Products</th>
                <th>Quantity</th>
              </tr>
              {orderData.map(order =>(
                order.items.map(item =>(
                  <tr className='border-b ' key={item._id}>
                    <td className='flex gap-4 px-5 py-2 max-sm:px-4' >
                      <img src={item.imgURL} alt={item.subTitle} className='object-fill w-20 h-20 max-md:w-10 max-md:h-10'/>
                      <div className='flex flex-col gap-2'>
                      {item.subTitle}
                      </div> 
                    </td>
                    <td className='text-center '>{item.quantity}</td>
                  </tr> 
                ))
              ))}
            </table>
          )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MyOrders
