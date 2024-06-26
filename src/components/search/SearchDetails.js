import React, { useEffect, useState } from "react";

export default function SearchDetails() {

  const [userList, setUserList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterDebitData, setFilterDebitData] = useState([]);
  const [filterCreditData, setFilterCreditData] = useState([]);

  const [selectedUserValue, setSelectedUserValue] = useState('');
  const [selectedMobileValue, setSelectedMobileValue] = useState('');
  const [selectedEmailValue, setSelectedEmailValue] = useState('');


  function handleSelectUserChange(e){
    console.log(e.target.value);
    setSelectedUserValue(e.target.value)
  };
  function handleSelectMobileChange(e){
    console.log(e.target.value);
    setSelectedMobileValue(e.target.value)
  };
  function handleSelectEmailChange(e){
    console.log(e.target.value);
    setSelectedEmailValue(e.target.value)
  };

function btnSearch(){
console.log('btn search');


 

let filterdDataList = userDetails.filter(item=>{
  console.log(item);
    if(item.userName == selectedUserValue || item.userName == selectedMobileValue || item.userName == selectedEmailValue){
        console.log(true);
        return item
    }
}) 

console.log(filterdDataList);


let debitType = filterdDataList.filter(item=>{
  item.expenseType !== 'Debit'
  if(item.expenseType !== 'Debit'){
    console.log('perticular type ',item.particularType);
   return  item.particularType

  }
   
})

// console.log(debitType);
// console.log(debitType.map((item)=> item.particularType));
//  debitType.map((item)=> filterDebitData(item.particularType));

// console.log(debitType,filterDebitData);

setFilterData(filterdDataList);
console.log(filterData);



}



function fetchUserDetails() {
  try {
    fetch(process.env.REACT_APP_API+"/userDetails")
      .then((res) => res.json())
      .then((value) => {
        console.log(value);
        setUserDetails(value);
      });
  } catch (err) {
    console.log(err);
  }
}

  function fetchUserData() {
    try {
      fetch(process.env.REACT_APP_API+"/users")
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          setUserList(value);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchUserDetails();
    fetchUserData()
  },[])

  return (
    <div>

<section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Search User Details </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card ">
                <div
                  className="card-header d-flex"
                  style={{ "column-gap": "15px" }}
                >
                  <div className="col-lg-3 col-md-4">
                    <label>User Name</label>
                    {/* <input
                      type="text"
                      placeholder="Search User Name"
                      className="form-control"
                    /> */}
                    <select className="form-control"   onChange={handleSelectUserChange}>
                      <option>-- select user --</option>
                      {
                        userList && userList.length > 0 && userList.map(item =>
                          <option value={item.userName} key={item.id}> {item.userName} </option>
                        )
                      }
                    </select>
                    
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <label>Mobile No.</label>
                    {/* <input
                      type="text"
                      placeholder="Search Mobile No."
                      className="form-control"
                    /> */}
                    <select className="form-control" onChange={handleSelectMobileChange}>
                      <option>-- select mobile no. --</option>
                      {
                        userList && userList.length > 0 && userList.map(item =>
                          <option value={item.mobileNo} key={item.id}> {item.mobileNo} </option>
                        )
                      }
                    </select>
                    
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <label>Email Id</label>
                    {/* <input
                      type="text"
                      placeholder="Search Email Id"
                      className="form-control"
                    /> */}
                     <select className="form-control" onChange={handleSelectEmailChange}>
                      <option>-- select email id  --</option>
                      {
                        userList && userList.length > 0 && userList.map(item =>
                          <option value={item.emailId} key={item.id}> {item.emailId} </option>
                        )
                      }
                    </select>
                    
                  </div>
                  <div className="col-lg-3 col-md-4">
                  <button type="submit" className="mt-4 btn btn-md btn-primary" onClick={()=>{btnSearch()}}> 
                      Search 
                    </button>
                    </div>

                </div>

                <div className="card-body">
                  <div className="col-md-12">
                <table className="table table-hover  table-bordered table-md table-responsive-sm">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: "100px" }}>Sr No.</th>
                        <th>User Name </th>
                        <th>Date </th>
                        <th>Credit </th>
                        <th>Credit Amount</th>
                        <th>Debit</th>
                        <th>Debit Amount</th> 
                      </tr>
                    </thead>
                    <tbody>


                        {

                          filterData && filterData.length > 0 && filterData.map((objValue, index) => (
                            <tr key={objValue.id}>
                              <td>{index + 1}</td>
                              <td>{objValue.userName}</td>
                              <td>{objValue.txtdate}</td> 
                              <td>{debitType.map((item)=> item.particularType)}</td>
                              <td>{objValue.particularType}</td>
                              <td>{objValue.expenseType}</td>
                              <td>{objValue.txtMessage}</td>
                            </tr>
                         ))}
                  </tbody>
                  </table>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
