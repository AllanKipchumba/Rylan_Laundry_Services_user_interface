import { useEffect, useState } from "react";
import { Infobox, base_url } from "../../index";
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
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "../../search/Search";
import { useDispatch } from "react-redux";
import { FILTER_BY_SEARCH } from "../../../redux/slices/fliterOurClients";
import { useFetchAuthData } from "../../../hooks/useFetchAuthData";
import { CashFlowChart } from "../../cashFlowChart/CashFlowChart";

export const washesIcon = <MdDryCleaning size={30} color="#46566e" />;
export const clientsIcon = <IoIosPeople size={30} color="#1f93ff" />;
export const revenueIcon = <AiOutlineDollarCircle size={30} color="#1dc88b" />;

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = useFetchAuthData();
  const { clients } = useSelector((store: RootState) => store["clients"]);
  const [totalWashes, setTotalwatshes] = useState<number>(0);
  const [clientsServed, setClientsServed] = useState<number>(0);
  const [grossRevenueGenerated, setGrossRevenueGenerated] = useState<number>(0);
  const [ourClients, setOurClients] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  //get current clients
  const indexOfLastProduct = currentPage * clientsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - clientsPerPage;
  const clientPage = clients.slice(indexOfFirstProduct, indexOfLastProduct);

  const CheckIfCashflowChartIsMounted = (mounted: boolean) =>
    setLoading(mounted);

  //get dashboard data
  const [err403, setErr403] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [grossSalesReport, clientsReport] = await Promise.all([
          axios({
            method: "get",
            url: `${base_url}/analytics/business`,
            headers: headers,
          }),
          axios({
            method: "get",
            url: `${base_url}/analytics/clients`,
            headers: headers,
          }),
        ]);
        setLoading(false);
        setTotalwatshes(grossSalesReport.data.totalNumberOfSales);
        setGrossRevenueGenerated(
          grossSalesReport.data.totalAmountMadeFromSales
        );
        setClientsServed(clientsReport.data.clientsServed - 1);
        setOurClients(clientsReport.data.clients);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          axiosError.response?.status == 403 && setErr403(true);
        } else {
          console.error(error);
          Notify.failure(`Unable to fetch Data!`);
        }
      }
    };

    fetchData();
  }, []);

  err403 && navigate("/login");
  //

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ ourClients, search }));
  }, [dispatch, ourClients, search]);

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

        <CashFlowChart checkIfMounted={CheckIfCashflowChartIsMounted} />

        <div className={styles["clients-list"]}>
          <div className={styles.header}>
            <h1>Our clients</h1>
            <Search
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
          {clients.length !== 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>frequency</th>
                    <th>revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {clientPage.map((client, index) => {
                    const { _id, count, totalAmount } = client;
                    return (
                      _id !== "" && (
                        <tr
                          className={styles.data}
                          key={index}
                          onClick={() =>
                            navigate(`/transaction-history/${_id}`)
                          }
                        >
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
                totalClients={clients.length}
              />
            </>
          ) : (
            <div className={styles.noTransactionRecord}>
              <p>No record present for `{search}`</p>
            </div>
          )}
        </div>
      </div>
    </CheckLoadingState>
  );
};
