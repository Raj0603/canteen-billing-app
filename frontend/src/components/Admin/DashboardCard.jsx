import React from "react";

const DashboardCard = ({ cardData }) => {
  const { title, data, icon: Icon } = cardData;
  return (
    <div className="dc-mc">
      <div className="dc-fc">

      <span className="dc-tc">{title}</span>
      <span className="dc-ic">{Icon && <Icon />}</span>
      </div>
      <h2 className="dc-rc">{data}</h2>
    </div>
  );
};

export default DashboardCard;



