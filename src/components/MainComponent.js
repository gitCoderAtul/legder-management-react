import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Calendar from "react-calendar";

export default function MainComponent() {
  const [value, onChange] = useState(new Date());

  // const [getCurrentDate, setCurrentDate] = useState();
  const [userData, setUserData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
   const [totalCredAmt,setTotalCredAmt] = useState(0);
   const [totalDebtAmt,setTotalDebtAmt] = useState(0);
   const [totalAmt,setTotalAmt] = useState(0);
    const searchValue = useRef();



  function funcGetDate(ev) {
    console.log(ev); 
    var currentDate = ev;
    var dd = String(currentDate.getDate()).padStart(2, "0");
    var mm = String(currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = currentDate.getFullYear();

    var currentDate = yyyy + "-" + mm + "-" + dd;
    console.log(currentDate);
    // console.log(getCurrentDate);
    
    try {
      fetch(process.env.REACT_APP_API + "/userDetails?txtdate="+currentDate)
        .then((res) => res.json())
        .then((value) => {
          console.log('date',value);
          // setUserData(value);
        });
    } catch (err) {
      console.log(err);
    }

    const filtered = userData.filter((item) => item.txtdate === currentDate);
    //  console.log(filtered.map((itemValue)=> itemValue.amount))
 
     const filteredAmout = filtered.map((itemValue)=> itemValue.amount);
     const filteredCredAmout = filtered.filter((item)=> (item.expenseType == 'Credit')? item.amount : null
    //   {  
    //   if(item.expenseType == 'Credit'){ 
    //   // console.log('item credit ',item.amount);
    //   console.log( parseInt(item.amount) )
    //   return   item.amount  
    //   } 
    //  }
    )
    const filteredDebtAmout = filtered.filter((item)=> (item.expenseType == 'Debit')? item.amount : null )
        console.log('credit amt',filteredCredAmout);
        console.log('debit amt',filteredDebtAmout);
 
      const calculateTotalAmount = () => {
        return filteredAmout.reduce((accumulator, item) => accumulator + parseInt(item), 0);
      };
      const calculateCreditmount = () => {
        return filteredCredAmout.reduce((accumulator, item) => accumulator + parseInt(item.amount), 0);
      };
      const calculateDebitAmount = () => {
        return filteredDebtAmout.reduce((accumulator, item) => accumulator + parseInt(item.amount), 0);
      };

      let totalAmount = calculateTotalAmount();
      let totalCreditAmount = calculateCreditmount();
      let totalDebitAmount = calculateDebitAmount();
      setTotalAmt(totalAmount)
      setTotalCredAmt(totalCreditAmount)
      setTotalDebtAmt(totalDebitAmount)
 
    // const totalAmt = filtered.reduce(
    //   (total, item) =>  console.log(total + item.amount, item.amount),
    //   0,
    // );
    console.log('total', totalAmount ); 
    console.log(filtered);

    //  filterData();
    setFilteredData(filtered);
    // console.log(filteredData);
    chartLoad();
    fetchData();
  }

  function chartLoad() {
    Highcharts.chart("container", {
      chart: {
        type: "pie",
      },
      title: {
        text: "Expense Status",
      },
      // tooltip: {
      //   valueSuffix: "%",
      // },
      subtitle: {
        text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
              filter: {
                operator: ">",
                property: "percentage",
                value: 10,
              },
            },
          ],
        },
      },
      series: [
        {
          name: "Expense Type",
          colorByPoint: true,
          data: [
            {
              name: "Debit Amount",
              y: totalDebtAmt,
            },
            {
              name: "Credit Amount",
              y: totalCredAmt,
            },
          ],
        },
      ],
    });
  }

  function fetchData() {
    try {
      fetch(process.env.REACT_APP_API + "/userDetails")
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          setUserData(value);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    chartLoad();
  }, []);
  
  function btnSearch() {
    console.log(searchValue.current.value);
   
    const filtered = userData.filter((item) => {
      // console.log('item',item.userName.toLowerCase())
      // console.log('search ',searchValue.current.value.toLowerCase())
      // console.log(item.userName.toLowerCase() == searchValue.current.value.toLowerCase());
      if(item.userName.toLowerCase() == (searchValue.current.value).toLowerCase() ){
        return item.userName
      }
    });
  console.log(filtered);
  // console.log(filtered[0].userName);
    // if( filtered != []){
    
      console.log(filtered);
     
      const filteredAmout = filtered.map((itemValue)=> itemValue.amount);
      const filteredCredAmout = filtered.filter((item)=> (item.expenseType == 'Credit')? item.amount : null);
      const filteredDebtAmout = filtered.filter((item)=> (item.expenseType == 'Debit')? item.amount : null )
      console.log('credit amt',filteredCredAmout);
      console.log('debit amt',filteredDebtAmout);

    const calculateTotalAmount = () => {
      return filteredAmout.reduce((accumulator, item) => accumulator + parseInt(item), 0);
    };
    const calculateCreditmount = () => {
      return filteredCredAmout.reduce((accumulator, item) => accumulator + parseInt(item.amount), 0);
    };
    const calculateDebitAmount = () => {
      return filteredDebtAmout.reduce((accumulator, item) => accumulator + parseInt(item.amount), 0);
    };

    let totalAmount = calculateTotalAmount();
    let totalCreditAmount = calculateCreditmount();
    let totalDebitAmount = calculateDebitAmount();
    setTotalAmt(totalAmount)
    setTotalCredAmt(totalCreditAmount)
    setTotalDebtAmt(totalDebitAmount)

    setFilteredData(filtered);
      chartLoad();
      fetchData();
      
    // }else{ 
    //   // setIsVisible(isVisible);
    // }

    
  }

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Home {isVisible ? 'Hide' : 'Show'}</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card ">
              <div
                className="card-header d-flex"
                style={{ "column-gap": "15px" }}
              >
                <input
                  type="text"
                  placeholder="Search User Name"
                  className="form-control"
                  ref={searchValue}
                />
                <button type="submit" className="btn btn-md btn-primary" onClick={()=>{btnSearch()}}>
                  
                  Search 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <section className=" col-lg-6 ">
            <div className="card ">
              <div className="card-body p-3">
                <Calendar
                  onChange={onChange}
                  value={value}
                  onClickDay={(ev) => {
                    funcGetDate(ev);
                  }}
                />
              </div>
            </div>
          </section>

 
       
          <section className=" col-lg-6 ">
          {/* {isVisible && ( */}
            <div className="row">
              <div class="col-lg-4 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>Total Expense</h3>

                    <p>{totalAmt}</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>Credit Amount</h3>

                    <p>{totalCredAmt} </p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-6">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>Debit Amount</h3>

                    <p>{totalDebtAmt} </p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          {/* )} */}
            {/* <div className="card ">
            <div className="card-header">
                    <h3 className="card-title">Expense Details </h3>
            </div>
          <div className="card-body p-3">

            </div>
            </div> */}

            <div className="card ">
              <div className="card-body p-3">
                <figure class="highcharts-figure">
                  <div id="container"></div>
                </figure>
              </div>
            </div>
          </section>
          {/* {isVisible && ( */}

          <section className=" col-lg-12 ">
            <div className="card ">
              <div className="card-body p-3">
                <table className="table table-hover  table-bordered table-md table-responsive-sm">
                  <thead className="table-primary">
                    <tr>
                      <th>Sr No.</th>
                      <th>User Name</th>
                      <th>Amount</th>
                      <th style={{ width: "100px" }}>Date</th>
                      <th>Particular Type </th>
                      <th>Expense Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData &&
                      filteredData.length > 0 &&
                      filteredData.map((objValue, index) => (
                        <tr key={objValue.id}>
                          <td>{index + 1}</td>
                          <td>{objValue.userName}</td>
                          <td>{objValue.amount}</td>
                          <td>{objValue.txtdate}</td>
                          <td>{objValue.particularType}</td>
                          <td>{objValue.expenseType}</td>
                          <td>{objValue.txtMessage}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* )} */}



        </div>
      </div>
    </div>
  );
}
