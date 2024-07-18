import React from 'react'
import { useSelector } from 'react-redux'

const MyOrders = () => {
    const orders = useSelector(state => state.orders) // Adjust according to your state structure

    return (
        <div>
            <h1>My Orders</h1>
            <div>
                
            </div>
        </div>
    )
}

export default MyOrders
