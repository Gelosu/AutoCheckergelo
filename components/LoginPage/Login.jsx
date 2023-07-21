import Link from "next/link";
export default function Login() {
  return (
    <main className="container vh-100 d-flex justify-content-center align-items-center">
      <section className="col-lg-5 d-flex justify-content-center align-items-center flex-column border border-dark h-50 rounded-3">
        <p className="mb-0 mt-3">TUPC ID</p>
        <input
          type="text"
          className="py-1 px-3 w-75 rounded border border-dark mb-3 text-center"
          placeholder="TUPC-**-****"
        />
        <p className="mb-0">PASSWORD</p>
        <input
          type="password"
          className="py-1 px-3 w-75 rounded border border-dark mb-3 text-center"
        />
        <Link href="/Classroom/F">
          <button
            type="button"
            href="/Dashboard"
            className="px-3 mb-3 btn btn-outline-dark"
          >
            LOGIN
          </button>
        </Link>
        <a
          className="link-primary mb-3 text-decoration-none"
          href="/login/ForgetPassword/ForgetPassword"
        >
          Forgot Password?
        </a>
        <p className="text-center px-lg-2 px-4">
          Don't have an account yet?
          <a
            className="primary-link text-decoration-none"
            href="/login/Register"
          >
            Register Now
          </a>
        </p>
      </section>
    </main>
  );
}
