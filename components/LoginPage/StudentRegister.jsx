import Link from "next/link";

export default function StudentRegister() {
    return (
      <main className="custom-h container-sm d-flex justify-content-center align-items-center flex-column overflow-auto">
        <p className="mb-0 fw-bold fs-5 ">STUDENT REGISTRATION</p>
        <section className="container-sm col-md-7 col-lg-6 py-3 px-4 border border-dark rounded">
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
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">COURSE</p>
              <select className="col-sm-6 rounded border border-dark text-sm-start text-center"
               id="inputGroupSelect2">
                <option selected>Choose....</option>
                <option>COET</option>
                <option>ESET</option>
                <option>ETECH</option>
                <option>MT</option>
              </select>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">YEAR</p>
              <select className="col-sm-6 rounded border border-dark text-sm-start text-center"
              id="inputGroupSelect3">
                <option selected>Choose....</option>
                <option>1ST</option>
                <option>2ND</option>
                <option>3RD</option>
                <option>4TH</option>
              </select>
          </form>
          <form className="row p-sm-2 px-3">
              <p className="col-sm-6 my-1 text-sm-start text-center">STATUS</p>
              <select className="col-sm-6 rounded border border-dark text-sm-start text-center"
              id="inputGroupSelect1">
                <option selected>Choose....</option>
                <option>REGULAR</option>
                <option>IRREGULAR</option>
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
  