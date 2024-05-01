import { useEffect, useState } from 'react';
import { getAuthId } from '../../../util/auth';
import findBestDish from './find-best-dish';
import DashboardCard from './DashboardCard';
import dollarCoin from '../../../assets/SVG/dollar-coin.svg';
import cart from '../../../assets/SVG/Cart.svg';
import fork from '../../../assets/SVG/Fork.svg';
import Order from './Order';
import OrderCard from './OrderCard';

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const id = getAuthId();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/v1/orders/' + id);
        const respData = await response.json();
        setData(respData);
      } catch (err) {
        console.error('error fetching order', err);
      }
    }

    getData();
  }, [id]);

  const statusChangeHandler = async (status,id) => {
    const data = {status:status};
    try{
      const response = await fetch('/api/v1/owner/orders/'+id,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if(!response.ok){
        throw new Error('could not change status')
      }

      const resData = await response.json();
      console.log(resData);
      window.alert('served');

    }catch(err){
      window.alert(err.message);
    }
  }

  const amount = data && data.totalAmount;
  const totalOrders = data && data.orders.length;
  const orders = (data && data.orders) || [];
  const bestDish = findBestDish(orders);

  return (
    <section className="owner-dashboard">
      <h1 className="heading-primary owner-dashboard__title">dashboard</h1>

      <div className="card-holder">
        <DashboardCard title="total revenue" content={amount}>
          <img src={dollarCoin} alt='currency symbol' />
        </DashboardCard>
        <DashboardCard title="total orders" content={totalOrders}>
          <img src={cart} alt='cart' />
        </DashboardCard>
        <DashboardCard title="best sellers" content={bestDish}>
          <img src={fork} alt='best sellers' />
        </DashboardCard>
      </div>

      <div>
        <h1 className="heading-primary owner-dashboard__title">orders</h1>
        <ul>
          <li>
            {orders.map((order) => {
              const paymentStatus = order.paymentInfo.status;
              const orderStatus = order.orderStatus;
              const totalPrice = order.totalPrice;
              const orderId = order._id;
              return (
                <Order
                  status={orderStatus}
                  payment={paymentStatus}
                  total={totalPrice}
                  key={orderId}
                  id={orderId}
                  handler={statusChangeHandler}
                >
                  {order.orderItems.map((item) => {
                    return <OrderCard key={item._id} title={item.name} quantity={item.quantity} price={item.price}/>;
                  })}
                </Order>
              );
            })}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default OwnerDashboard;
