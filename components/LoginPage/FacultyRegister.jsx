import Link from "next/link";

export default function FacultyRegister() {
  
    return (
      <main className="container-sm vh-100 d-flex justify-content-center align-items-center flex-column">
        <p className="mb-0 fw-bold fs-5 ">FACULTY REGISTRATION</p>
        <section className="container-sm col-lg-6 py-3 px-4 border border-dark rounded">
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">TUPC ID</p>
              <input type="text" className="col-sm-6 rounded border border-dark text-sm-start text-center"/>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">SURNAME</p>
              <input type="text" className="col-sm-6 rounded border border-dark text-sm-start text-center"/>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">FIRST NAME</p>
              <input type="text" className="col-sm-6 rounded border border-dark text-sm-start text-center"/>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">GSFE ACCOUNT</p>
              <input type="text" className="col-sm-6 rounded border border-dark text-sm-start text-center"/>
          </form>
          <form className="row p-sm-2 px-3" onChange={(e)=>{console.log(e.target.value)}}>
              <p className="col-sm-6 my-1 text-sm-start text-center">SUBJECT DEPARTMENT</p>
              <select className="col-sm-6 rounded border border-dark text-sm-start text-center"
               id="inputGroupSelect4">
                <option selected>Choose....</option>
                <option value="DIT" >DIT</option>
                <option value="DIT?">DIT</option>
                <option value="EHH??">EHH?</option>
                <option value="EHH???">EHH???</option>
              </select>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">PASSWORD</p>
              <input type="password" className="col-sm-6 rounded border border-dark text-sm-start text-center"/>
          </form>
          <div className="text-center py-2">
            <Link href="/login"><button className="text-center px-3 py-1 btn btn-outline-dark">SUBMIT</button></Link>
          </div>    
        </section>
      </main>
    );
  }
  