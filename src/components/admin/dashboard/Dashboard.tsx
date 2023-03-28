import { useEffect, useState } from "react";
import { Infobox } from "../../index";
import styles from "./dashboard.module.scss";
import { MdDryCleaning } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Notify } from "notiflix";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CheckLoadingState } from "../../checkLoadingState/CheckLoadingState";
import { Pagination } from "../../pagination/Pagination";

const washesIcon = <MdDryCleaning size={30} color="#46566e" />;
const clientsIcon = <IoIosPeople size={30} color="#1f93ff" />;
const revenueIcon = <AiOutlineDollarCircle size={30} color="#1dc88b" />;

import Cookies from "js-cookie";

export const Dashboard = () => {
  ///

  console.log(document.cookie);

  ///
  const [totalWashes, setTotalwatshes] = useState<number>(0);
  const [clientsServed, setClientsServed] = useState<number>(0);
  const [grossRevenueGenerated, setGrossRevenueGenerated] = useState<number>(0);
  const [ourclients, setOurClients] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  //get current clients
  const indexOfLastProduct = currentPage * clientsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - clientsPerPage;

  //get dashboard data
  useEffect(() => {
    const getgrossSalesReport = async () => {
      setLoading(true);
      try {
        await axios({
          method: "get",
          url: `http://localhost:5000/analytics/business`,
          headers: headers,
        }).then((res) => {
          setLoading(false);
          setTotalwatshes(res.data.totalNumberOfSales);
          setGrossRevenueGenerated(res.data.totalAmountMadeFromSales);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
        Notify.failure(`${error}!`);
      }
    };
    const getClientsReport = async () => {
      setLoading(true);
      try {
        await axios({
          method: "get",
          url: `http://localhost:5000/analytics/clients`,
          headers: headers,
        }).then((res) => {
          setLoading(false);
          setClientsServed(res.data.clientsServed);
          setOurClients(res.data.clients);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
        Notify.failure(`${error}!`);
      }
    };
    getgrossSalesReport();
    getClientsReport();
  }, []);

  const clientPage = ourclients.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <CheckLoadingState loading={loading}>
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
                  {/* <th>#</th> */}
                  <th>name</th>
                  <th>frequency</th>
                  <th>revenue</th>
                </tr>
              </thead>
              <tbody>
                {clientPage.map((client, index) => {
                  const { _id, count, totalAmount } = client;
                  return (
                    _id !== null && (
                      <tr key={index}>
                        {/* <td>{index}</td> */}
                        <td>{_id}</td>
                        <td>{count}</td>
                        <td>Ksh {totalAmount}</td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              clientsPerPage={clientsPerPage}
              totalClients={ourclients.length}
            />
          </div>
        )}
      </div>
    </CheckLoadingState>
  );
};
