import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function StudentSetting() {
  const searchParams = useSearchParams();
  const TUPCID = searchParams.get("TUPCID");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [gsfeacc, setGsfeacc] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const fetchstudentdate = async () =>{
      try{
        const response = await axios.get(`http://localhost:3001/studinfos/${TUPCID}`);
        const {FIRSTNAME, SURNAME, MIDDLENAME, COURSE, YEAR, STATUS, GSFEACC, PASSWORD} = response.data;
        setFirstName(FIRSTNAME)
        setSurName(SURNAME)
        setMiddleName(MIDDLENAME)
        setCourse(COURSE)
        setYear(YEAR)
        setStatus(STATUS)
        setGsfeacc(GSFEACC)
        setPassword(PASSWORD)
      }
      catch{
        
      }
    };
    fetchstudentdate()
  }, [TUPCID])
    

  return (
    <main className="custom-m col-11 col-md-10 p-0">
      <section className="container-fluid p-sm-4 py-3 ">
        <div className="d-flex align-items-center">
          <Link href="">
            <img src="/back-arrow.svg" height={30} width={40} />
          </Link>
          <h2 className="m-0">Settings</h2>
        </div>
        <h3 className="text-center pt-3 m-0 ">UPDATE PERSONAL INFO</h3>
        <div className="d-flex justify-content-center flex-column container col-md-10 col-lg-7 rounded border border-dark bg-lightgray">
          <p className="text-end">EDIT</p>
          <form className="row p-3 pt-0 col-sm-10 text-sm-start text-center align-self-center">
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">TUPC ID</p>
              <input
                type="text"
                value={TUPCID}
                className="col-12 rounded py-1 px-3 border border-dark bg-secondary"
                readOnly
              />
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">GSFE ACCOUNT</p>
              <input
                type="text"
                value={gsfeacc}
                className="col-12 rounded py-1 px-3 border border-dark"
              />
            </div>
            <div className="col-sm-6 p-2">
              
              <p className="p-0 m-0">FIRST NAME</p>
              <input
                type="text"
                value={firstName}
                className="col-12 rounded py-1 px-3 border border-dark"
              />
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">COURSE</p>
              <select
                type="text"
                value={course}
                className="col-12 rounded py-1 px-3 border border-dark"
              >
                <option value="none" selected disabled hidden>
                  Choose...
                </option>
                <option value="BSCE">BSCE</option>
                <option value="BSEE">BSEE</option>
                <option value="BSME">BSME</option>
                <option value="BSIE ICT">BSIE ICT</option>
                <option value="BSIE IA">BSIE IA</option>
                <option value="BSIE HE">BSIE HE</option>
                <option value="BTTE CP">BTTE CP</option>
                <option value="BTTE EL">BTTE EL</option>
                <option value="BET AT">BET AT</option>
                <option value="BET CT">BET CT</option>
                <option value="BET COET">BET COET</option>
                <option value="BET ET">BET ET</option>
                <option value="BET ESET">BET ESET</option>
                <option value="BET MT">BET MT</option>
                <option value="BET PPT">BET PPT</option>
              </select>
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">MIDDLE NAME</p>
              <input
                type="text"
                value={MiddleName}
                className="col-12 rounded py-1 px-3 border border-dark"
              />
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">YEAR</p>
              <select
                type="text"
                value={year}
                className="col-12 rounded py-1 px-3 border border-dark"
              >
                <option value="none" selected disabled hidden>
                  Choose...
                </option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">SURNAME</p>
              <input
                type="text"
                value={surName}
                className="col-12 rounded py-1 px-3 border border-dark"
              />
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">SECTION</p>
              <select
                type="text"
                className="col-12 rounded py-1 px-3 border border-dark"
              >
                <option value="none" selected disabled hidden>
                  Choose...
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">STATUS</p>
              <select
                type="text"
                value={status}
                className="col-12 rounded py-1 px-3 border border-dark"
              >
                <option value="none" selected hidden disabled>
                  Choose...
                </option>
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
              </select>
            </div>
            <div className="col-sm-6 p-2">
              <p className="p-0 m-0">PASSWORD</p>
              <input
                type="text"
                value={password}
                className="col-12 rounded py-1 px-3 border border-dark"
              />
            </div>
            <div className="pt-3 text-center col-12">
              <button className="btn btn-light col-md-5 col-lg-2 border border-dark rounded text-center">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
