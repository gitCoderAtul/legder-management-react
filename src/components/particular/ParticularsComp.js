import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

export default function ParticularsComp() {

    let [particularList, setParticularList] = useState();

  //formik form
  const formik = useFormik({
    initialValues: {
      particularType: "", 
    },
    validationSchema: Yup.object({
        particularType: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required Perticular Name") 
    }),
    onSubmit: (formdata, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formdata);

      
        fetch(process.env.REACT_APP_API + "/perticulars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
            toast("Particluar Added");
            fetchData(); 
            resetForm();
          });
     
    },
  });

  console.log(process.env.REACT_APP_API);
  function fetchData() {
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

  useEffect(() => {
    fetchData();
  }, []);


  return (
<div> 
<section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Perticular components </h1>
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
                  <h3 className="card-title">Particular Form</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Particular Type</label>
                      <input
                        className="form-control"
                        placeholder="Enter Particular Type"
                        id="particularType"
                        name="particularType"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.particularType}
                      />
                      {formik.touched.particularType && formik.errors.particularType ? (
                        <div>{formik.errors.particularType}</div>
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
                        <th>Particular Type </th> 
                      </tr>
                    </thead>
                    <tbody>
                      {particularList &&
                        particularList.length > 0 &&
                        particularList.map((value, index) => (
                          <tr key={value.id}>
                            <td>{index + 1}</td>
                            <td>{value.particularType}</td> 
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
  )
}
