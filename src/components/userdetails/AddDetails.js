import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

export default function AddDetails() {
  let [userList, setUserList] = useState();
  let [particularList, setParticularList] = useState();
  let [expenseList, setExpenseList] = useState();
  let [userDetailsList, setUserDetailsList] = useState();



  const formik = useFormik({
    initialValues: {
      userName: '',
      amount: '',
      txtdate: '',
      particularType:'',
      expenseType:'',
      txtMessage:''
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        amount: Yup.number().positive().integer()
        .required('Required'),
        txtdate: Yup.date().default(() => new Date()).required('Required'),
        particularType: Yup.string()
        .required('Required'),
        expenseType:Yup.string()
        .required('Required'),
        txtMessage:Yup.string().min(4,'Must be 4 characters').max(300, 'Must be 300 characters or less').required('Required'), 
    }),
    onSubmit: (formdata, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formdata);

      fetch(process.env.REACT_APP_API + "/userDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
      .then((res) => res.json())
        .then((value) => {
          console.log(value);
            toast("User Details Added");
            fetchData(); 
            resetForm();
          });

    },
  });


  function fetchData() {
    try {
      fetch(process.env.REACT_APP_API+"/userDetails")
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          setUserDetailsList(value);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchParticularData() {
    try {
      fetch(process.env.REACT_APP_API+"/perticulars")
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          setParticularList(value);
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
  function fetchExpenseTypeData() {
    try {
      fetch(process.env.REACT_APP_API+"/expenseTypes")
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          setExpenseList(value);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchParticularData();
    fetchUserData();
    fetchExpenseTypeData();
    fetchData();
  }, []);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Add Details </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
              <div className="col-md-4">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">User Form</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="card-body">
                    <div class="form-group">
                      <label>User Name</label>
                      <select className='form-control'
                          id="userName"
                          name="userName"
                          onChange={formik.handleChange}>
                            <option value=''>--  Select User Name --</option> 
                            {
                              userList && userList.length > 0 && userList.map((value)=>
                                <option value={value.userName} key={value.id}> {value.userName}</option>
                              )
                            }  
                          </select> 
                        
                      {formik.touched.userName && formik.errors.userName ? (
                        <div>{formik.errors.userName}</div>
                      ) : null}
                    </div>

                    <div class="form-group">
                      <label>Amount </label>
                      <input
                        className="form-control"
                        placeholder="Enter Amount"
                        id="amount"
                        name="amount"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                      />
                      {formik.touched.amount && formik.errors.amount ? (
                        <div>{formik.errors.amount}</div>
                      ) : null}
                    </div>

                    <div class="form-group">
                      <label>Date</label>
                      <input
                        className="form-control"
                        placeholder="Enter User Name"
                        id="txtdate"
                        name="txtdate"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.txtdate}
                      />
                      {formik.touched.txtdate && formik.errors.txtdate ? (
                        <div>{formik.errors.txtdate}</div>
                      ) : null}
                    </div>

                    <div class="form-group">
                      <label>Particular Type </label>

                      <select className='form-control'
                          id="particularType"
                          name="particularType"
                          onChange={formik.handleChange}>
                            <option value=''>--  Select Particular Type --</option> 
                             {
                              particularList && particularList.length > 0 && particularList.map((value)=>
                                <option value={value.particularType} key={value.id}> {value.particularType}</option>
                              )
                            }  
                          </select> 
                      {formik.touched.particularType && formik.errors.particularType ? (
                        <div>{formik.errors.particularType}</div>
                      ) : null}
                    </div>

                    <div class="form-group">
                      <label>Expense Type </label>

                      <select className='form-control'
                          id="expenseType"
                          name="expenseType"
                          onChange={formik.handleChange}>
                            <option value=''>--  Select Expense Type --</option> 

                             {
                              expenseList && expenseList.length > 0 && expenseList.map((value)=>
                                <option value={value.expenseType} key={value.id}> {value.expenseType}</option>
                              ) 
                            }  
                          </select> 
                      {formik.touched.expenseType && formik.errors.expenseType ? (
                        <div>{formik.errors.expenseType}</div>
                      ) : null}
                    </div>

                    <div class="form-group">
                      <label>Message </label>
                     <textarea className="form-control"
                      id="txtMessage"
                      name="txtMessage"
                      onChange={formik.handleChange}
                      value={formik.values.txtMessage}
                     placeholder="Enter Message" ></textarea>
                      {formik.touched.txtMessage && formik.errors.txtMessage ? (
                        <div>{formik.errors.txtMessage}</div>
                      ) : null}
                    </div>

                    

                  </div>

                  <div class="card-footer">
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">List of Instructor</h3>
                </div>
                <div className="card-body">
                  <table className="table table-hover  table-bordered table-md table-responsive-sm">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: "100px" }}>Sr No.</th>
                        <th>User Name </th>
                        <th>Amunt </th>
                        <th>Date </th>
                        <th>Particular Type </th>
                        <th>Expense Type </th>
                        <th>Message </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetailsList &&
                        userDetailsList.length > 0 &&
                        userDetailsList.map((value, index) => (
                          <tr key={value.id}>
                            <td>{index + 1}</td>
                            <td>{value.userName}</td>
                            <td>{value.amount}</td>
                            <td>{value.txtdate}</td>
                            <td>{value.particularType}</td>
                            <td>{value.expenseType}</td>
                            <td>{value.txtMessage}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
