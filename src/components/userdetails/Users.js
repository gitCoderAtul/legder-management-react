import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

export default function Users() {
  let [userList, setUserList] = useState();

  //formik form
  const formik = useFormik({
    initialValues: {
      userName: "",
      mobileNo: "",
      emailId: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required User Name"),
      mobileNo: Yup.number().required("Required"),
      emailId: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (formdata, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formdata);

      
        fetch(process.env.REACT_APP_API + "/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
            toast("User Added");
            fetchData(); 
            resetForm();
          });
     
    },
  });

  console.log(process.env.REACT_APP_API);
  function fetchData() {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>User </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">User Form</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="card-body">
                    <div class="form-group">
                      <label>User Name</label>
                      <input
                        className="form-control"
                        placeholder="Enter User Name"
                        id="userName"
                        name="userName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                      />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div>{formik.errors.userName}</div>
                      ) : null}

                      {/* <input type="text" class="form-control" id="exampleInputInstructor" placeholder="Enter Instructor Name" /> */}
                    </div>
                    <div class="form-group">
                      <label>Mobile No.</label>
                      <input
                        className="form-control"
                        placeholder="Enter Mobile No."
                        id="mobileNo"
                        name="mobileNo"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobileNo}
                      />
                      {formik.touched.mobileNo && formik.errors.mobileNo ? (
                        <div>{formik.errors.mobileNo}</div>
                      ) : null}

                      {/* <input type="text" class="form-control" id="exampleInputInstructor" placeholder="Enter Instructor Name" /> */}
                    </div>
                    <div class="form-group">
                      <label>Email Id</label>
                      <input
                        className="form-control"
                        placeholder="Enter Email Id"
                        id="emailId"
                        name="emailId"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emailId}
                      />
                      {formik.touched.emailId && formik.errors.emailId ? (
                        <div>{formik.errors.emailId}</div>
                      ) : null}

                      {/* <input type="text" class="form-control" id="exampleInputInstructor" placeholder="Enter Instructor Name" /> */}
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

            <div className="col-md-6">
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
                        <th>Mobile No. </th>
                        <th>Email Id </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList &&
                        userList.length > 0 &&
                        userList.map((value, index) => (
                          <tr key={value.id}>
                            <td>{index + 1}</td>
                            <td>{value.userName}</td>
                            <td>{value.mobileNo}</td>
                            <td>{value.emailId}</td>
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
