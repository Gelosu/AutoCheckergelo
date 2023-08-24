import Link from "next/link";

export default function Result() {
  return (
    <main className="custom-m col-11 col-md-10 p-0">
      <section className="container-fluid p-sm-4 py-3 ">
        <div className="d-flex align-items-center">
          <Link href="/Classroom/S">
            <img src="/back-arrow.svg" height={30} width={40} />
          </Link>
        </div>
        <div className="d-flex justify-content-center flex-column container col-md-10 col-lg-7 rounded border border-dark bg-lightgray py-3">
            <h5>&#123;SUBJECT NAME&#125;</h5>
            <h5>&#123;NAME OF PROFFESSOR&#125;</h5>
            <section className="container-fluid border border-dark rounded">
                <div className="row">
                    <p className="col-3 m-0 border border-secondary text-center custom-round1">TEST NO.</p>
                    <p className="col-3 m-0 border border-secondary text-center">NO. OF CORRECT</p>
                    <p className="col-3 m-0 border border-secondary text-center">WRONG QUESTIONS</p>
                    <p className="col-3 m-0 border border-secondary text-center custom-round2">TOTAL SCORE</p>
                </div>
                {/* object value */}
                <div className="row" key="">
                <p className="col-3 border border-secondary text-center custom-round1"></p>
                    <p className="col-3 border border-secondary text-center"></p>
                    <p className="col-3 border border-secondary text-center"></p>
                    <p className="col-3 border border-secondary text-center custom-round2"></p>
                </div>
            </section>
        </div>
      </section>
    </main>
  );
}
