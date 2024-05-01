const ORDERSTATUS = {
    cook: 'COOKING',
    done: 'Served',
  };
  
  const Order = (props) => {
    const {status, payment, total, id, handler} = props;
    // const isCooking = ORDERSTATUS.cook === props.status.toString().toUpperCase();
    const isDone = ORDERSTATUS.done === props.status.toString();
  
    return (
      <div className="order">
        {props.children}
        <div className="order__details">
          <p className="order__text">payment: {payment}</p>
          <p className="order__text">total: {total}</p>
          <p className="order__text">status: {status}</p>
        </div>
  
        {/* {!isCooking && !isDone && <button onClick={()=>{handler(ORDERSTATUS.cook,id)}} className="button button--white">Cooking</button>} */}
        {!isDone && <button onClick={()=>{handler(ORDERSTATUS.done,id)}} className="button button--white">completed</button>}
      </div>
    );
  };
  
  export default Order;
  