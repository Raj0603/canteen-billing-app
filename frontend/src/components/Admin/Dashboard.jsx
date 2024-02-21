import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import "./Dashboard.css";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../actions/orderAction";
import { getAllOwners, getAllStudents } from "../../actions/studentAction";
import { getAdminItem } from "../../actions/itemAction";
import AdminSidebar from "./AdminSidebar";
import DashboardCard from "./DashboardCard";
import {
  format,
  addDays,
  setDate,
  setMonth,
  differenceInDays,
  differenceInMonths,
} from "date-fns";
import { CircleDollarSign, ShoppingCart, Contact2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.allOrders);
  const { students } = useSelector((state) => state.allStudents);
  const { items, itemsCount } = useSelector((state) => state.items);
  const { owners, ownerCount } = useSelector((state) => state.allOwners);

  const [genderData, setGenderData] = useState({
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"],
      },
    ],
  });

  const [selectedRange, setSelectedRange] = useState("weekly");

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllStudents());
    dispatch(getAdminItem());
    dispatch(getAllOwners());
  }, []);

  useEffect(() => {
    if (students && students?.students?.length > 0) {
      const maleCount = students?.students?.filter(
        (student) => student.gender === "Male"
      ).length;
      const femaleCount = students?.students?.filter(
        (student) => student.gender === "Female"
      ).length;
      const otherCount = students?.students?.filter(
        (student) => student.gender === "Other"
      ).length;

      setGenderData((prevData) => ({
        ...prevData,
        datasets: [
          {
            data: [maleCount, femaleCount, otherCount],
            backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"],
          },
        ],
      }));
    }
  }, [students]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, orders?.totalAmount || 0],
      },
    ],
  };

  return (
    <>
      <div className="db-mc">
        <div className="db-tc"></div>

        <div className="db-dcc">
          <DashboardCard
            cardData={{
              title: "Total Revenue",
              data: orders?.totalAmount,
              icon: CircleDollarSign,
            }}
          />
          <DashboardCard
            cardData={{
              title: "Total Orders",
              data: orders?.totalOrder,
              icon: ShoppingCart,
            }}
          />
          <DashboardCard
            cardData={{
              title: "Total Owners",
              data: owners?.ownerCount,
              icon: Contact2,
            }}
          />
          <DashboardCard
            cardData={{
              title: "Total Students",
              data: students?.totalStudents,
              icon: Contact2,
            }}
          />
        </div>

        <div className="db-gc">
          <Line data={lineState} />

          <Doughnut data={genderData} options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
