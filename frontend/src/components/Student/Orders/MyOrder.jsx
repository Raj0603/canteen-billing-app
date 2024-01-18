import React from 'react';
import './MyOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { myOrders } from '../../../actions/orderAction';
import { useAlert } from 'react-alert';
import OrderCard from './OrderCard';
import Loading from '../../Loading/Loading';

export const MyOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='my-mc'>
          <h2>Order History</h2>
          {orders &&
            orders
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse() // Reverse the array
              .map((order) => <OrderCard order={order} key={order.paidAt} />)}
        </div>
      )}
    </>
  );
};
