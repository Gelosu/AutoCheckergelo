"use client";

import { Axios } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FacultyRegister() {
  const [tupcId, setTupcId] = useState("");
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [gsfeAcc, setGsfeAcc] = useState("");
  const [subjectDep, setSubjectDep] = useState("");
  const [passWord, setPassWord] = useState("");
  const gsfeRegExp = /@gsfe.tupc.edu.ph/;
  const tupcRegExp = /TUPC-\d{2}-\d{4}$/;
  const schema = yup.object().shape({
    TupcId: yup.string().matches(tupcRegExp, "Invalid TUPC-ID!"),
    surName:yup.string().required("Surname is Required!"),
    firstName: yup.string().required("Firstname is Required!"),
    middleName: yup.string().required("Middlename is Requied!"),
    gsfeAccount:yup.string().matches(gsfeRegExp, "Invalid gsfe account!"),
    subjectDepartment:yup.string().required("Please Choose!"),
    pass: yup.string().required("Password Required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const submitForm = (data) => {
    console.log(data);
    Axios.post("", {
      tupcId:tupcId,
      surName:surname,
      firstName:firstname,
      middleName:middlename,
      gsfeAccount:gsfeAcc,
      subjectDepartment:subjectDep,
      pass: passWord,
    }).then(() => {
      router.push("/Classroom/S");
    });
  };
  return (
    <main className="container-sm vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="mb-0 fw-bold fs-5 ">FACULTY REGISTRATION</p>
      <section className="container-sm col-lg-6 py-3 px-4 border border-dark rounded">
        <form onClick={handleSubmit(submitForm)}>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">TUPC ID</p>
            <input
              type="text"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setTupcId(e.target.value)}
              {...register("TupcId")}
            />
            <small className="text-end text-danger">{errors.TupcId?.message}</small>
          </div>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">SURNAME</p>
            <input
              type="text"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setSurname(e.target.value)}
              {...register("surName")}
            />
            <small className="text-end text-danger">{errors.surName?.message}</small>
          </div>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">
              FIRST NAME
            </p>
            <input
              type="text"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setFirstname(e.target.value)}
              {...register("firstName")}
            />
            <small className="text-end text-danger">{errors.firstName?.message}</small>
          </div>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">
              MIDDLE NAME
            </p>
            <input
              type="text"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setMiddlename(e.target.value)}
              {...register("middleName")}
            />
            <small className="text-end text-danger">{errors.middleName?.message}</small>
          </div>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">
              GSFE ACCOUNT
            </p>
            <input
              type="text"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setGsfeAcc(e.target.value)}
              {...register("gsfeAccount")}
            />
            <small className="text-end text-danger">{errors.gsfeAccount?.message}</small>
          </div>
          <form
            className="row p-sm-2 px-3"
          >
            <p className="col-sm-6 my-1 text-sm-start text-center">
              SUBJECT DEPARTMENT
            </p>
            <select
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              id="inputGroupSelect4"
              onChange={e => setSubjectDep(e.target.value)}
              {...register("subjectDepartment")}
            >
              <option selected>Choose....</option>
              <option value="DIT">DIT</option>
              <option value="DIT?">DIT</option>
              <option value="EHH??">EHH?</option>
              <option value="EHH???">EHH???</option>
            </select>
            <small className="text-end text-danger">{errors.subjectDepartment?.message}</small>
          </form>
          <div className="row p-sm-2 px-3">
            <p className="col-sm-6 my-1 text-sm-start text-center">PASSWORD</p>
            <input
              type="password"
              className="col-sm-6 rounded border border-dark text-sm-start text-center"
              onChange={e => setPassWord(e.target.value)}
              {...register("pass")}
            />
            <small className="text-end text-danger">{errors.pass?.message}</small>
          </div>
          <div className="text-center py-2">
            <button className="text-center px-3 py-1 btn btn-outline-dark" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
