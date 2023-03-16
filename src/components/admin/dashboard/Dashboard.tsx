import React, { useEffect, useState } from "react";
import { Infobox } from "../../index";
import styles from "./dashboard.module.scss";
import { MdDryCleaning } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Notify } from "notiflix";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const washesIcon = <MdDryCleaning size={30} color="#46566e" />;
const clientsIcon = <IoIosPeople size={30} color="#1f93ff" />;
const revenueIcon = <AiOutlineDollarCircle size={30} color="#1dc88b" />;

export const Dashboard = () => {
  const [totalWashes, setTotalwatshes] = useState<number>(0);
  const [clientsServed, setClientsServed] = useState<number>(0);
  const [grossRevenueGenerated, setGrossRevenueGenerated] = useState<number>(0);
  const [ourclients, setOurClients] = useState([]);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  //get dashboard data
  useEffect(() => {
    const getgrossSalesReport = async () => {
      try {
        await axios({
          method: "get",
          url: `http://localhost:5000/analytics/business`,
          headers: headers,
        }).then((res) => {
          setTotalwatshes(res.data.totalNumberOfSales);
          setGrossRevenueGenerated(res.data.totalAmountMadeFromSales);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
      }
    };
    const getClientsReport = async () => {
      try {
        await axios({
          method: "get",
          url: `http://localhost:5000/analytics/clients`,
          headers: headers,
        }).then((res) => {
          setClientsServed(res.data.clientsServed);
          setOurClients(res.data.clients);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
      }
    };
    getgrossSalesReport();
    getClientsReport();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles["info-box"]}>
        <Infobox
          cardClass={`${styles.card} ${styles.card1}`}
          title={`total Washes`}
          count={totalWashes}
          icon={washesIcon}
        />
        <Infobox
          cardClass={`${styles.card} ${styles.card2}`}
          title={`Clients served`}
          count={clientsServed}
          icon={clientsIcon}
        />
        <Infobox
          cardClass={`${styles.card} ${styles.card3}`}
          title={`total Revenue generated`}
          count={`Ksh ${grossRevenueGenerated}`}
          icon={revenueIcon}
        />
      </div>

      {ourclients.length !== 0 && (
        <div className={styles["clients-list"]}>
          <h1>Our clients</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>frequency</th>
                <th>revenue</th>
              </tr>
            </thead>
            <tbody>
              {ourclients.map((client, index) => {
                const { _id, count, totalAmount } = client;
                return (
                  _id !== null && (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{_id}</td>
                      <td>{count}</td>
                      <td>Ksh {totalAmount}</td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
