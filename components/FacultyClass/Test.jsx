"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTupcid } from "@/app/provider";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FacultyClassTest() {
  const { tupcids } = useTupcid();
  const [testpaper, setTestpaper] = useState([]);
  const [testName, setTestName] = useState("");
  const [testNumber, setTestNumber] = useState("");
  const searchparams = useSearchParams();
  const classname = searchparams.get("classname");
  const subjectname = searchparams.get("subjectname");
  const classcode = searchparams.get("classcode");
  const router = useRouter();
  const [editTestIndex, setEditTestIndex] = useState(-1);
  const [editTestName, setEditTestName] = useState("");
  const [editTestNumber, setEditTestNumber] = useState("");


  //getting data based on tupcid again...
  useEffect(() => {
    fetchAndSetTestpapers();
    const interval = setInterval(fetchAndSetTestpapers, 1000);
    return () => clearInterval(interval);
  }, [tupcids]);

  const presetPage = () => {
    router.push(
      "/Classroom/F/Test/PresetTest"
    )
  }

  const fetchAndSetTestpapers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/gettestpaper/${tupcids}/${classcode}/${classname}/${subjectname}`
      );
      if (response.status === 200) {
        // Use the received testpaper data directly
        setTestpaper(response.data);
      } else {
        console.error("Error fetching test names");
      }
    } catch (error) {
      console.error("Error fetching testname:", error);
    }
  };
  
  

  //adding test
  const addTest = async () => {
    if (testName.trim() !== "") {
      try {
        const nextIndex = testpaper.length + 1;
        // Send a POST request to your backend to add the test
        const response = await axios.post("http://localhost:3001/addtest", {
          TUPCID: tupcids,
          class_name: classname,
          subject_name: subjectname,
          class_code: classcode,
          test_name: testName,
          test_number: testNumber,
          index_number: nextIndex,
        });
  
        // Assuming your backend returns a success message
        if (response.data.success) {
          fetchTest();
          // Update index numbers in the frontend
          updateIndexNumbersFrontend();
          // Update index numbers in the database
          await updateIndexNumbersInDatabase();
          setTestName("");
        }
      } catch (error) {
        console.error("Error adding test:", error);
      }
    }
  };

  //delete
  const deletetest = async (classcode, testNumber, testName, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deletetest/${classcode}/${testNumber}/${testName}/${index}`
      );
      if (response.status === 200) {
        console.log("Test deleted successfully");
  
        // Remove the deleted test from the frontend representation
        const updatedTestpaper = testpaper.filter((test) => test.index_number !== index);
        setTestpaper(updatedTestpaper);
  
        // Update index numbers in the remaining tests in the frontend
        const updatedIndexFrontend = updatedTestpaper.map((test, newIndex) => ({
          ...test,
          index_number: newIndex + 1,
        }));
        setTestpaper(updatedIndexFrontend);
  
        // Update index numbers in the database
        await updateIndexNumbersInDatabase(updatedIndexFrontend);
      } else {
        console.error("Error deleting test");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };
  
  

  /// Update index numbers for tests after the deleted test in the database
  const updateIndexNumbersFrontend = () => {
    const updatedTestpaper = testpaper.map((test, index) => ({
      ...test,
      index_number: index + 1,
    }));
    setTestpaper(updatedTestpaper);
  };
  
  const updateIndexNumbersInDatabase = async () => {
    try {
      // Prepare the updated testpaper array with only index numbers and relevant identifiers
      const updatedIndexNumbers = testpaper.map((test) => ({
        index_number: test.index_number,
        class_code: test.class_code,
        test_number: test.test_number,
        test_name: test.test_name,
      }));
  
      // Send a PUT request to update index numbers in the backend
      const response = await axios.put(
        "http://localhost:3001/updateindexnumbers",
        updatedIndexNumbers
      );
  
      if (response.data.success) {
        console.log("Index numbers updated in the database");
      } else {
        console.error("Error updating index numbers in the database");
      }
    } catch (error) {
      console.error("Error updating index numbers in the database:", error);
    }
  };
  
  

  const updateTestNameAndNumber = async (index) => {
    const updatedTest = testpaper[index];
    try {
      console.log("index number:", index)
      const response = await axios.put(
        `http://localhost:3001/updatetest/${classcode}/${testName}/${testNumber}/${index}`
      );
      // ...
    } catch (error) {
      console.error("Error updating test name and number:", error);
    }
  };
  

  const fetchTest = async () => {
    await fetchAndSetTestpapers();
  };

  return (
    <main className="col-11 col-md-10 p-0">
      <section className="container-fluid p-sm-4 py-3 ">
        <h3 className="d-flex align-items-center gap-2 text-decoration-none link-dark">
          <a href="/Classroom/F" className="align-self-center pb-1">
            <img src="/back-arrow.svg" height={30} width={40} />
          </a>
          <span>
            {classname} CLASSCODE: {classcode} SUBJECT: {subjectname}
          </span>
        </h3>
        <div className="d-flex gap-3 py-3 ">
          <a className="link-dark">
            <h4>TEST</h4>
          </a>
          <Link
            href={{
              pathname: "/Classroom/F/Students",
              query: {
                classname: classname,
                classcode: classcode,
                subjectname: subjectname,
              },
            }}
            className="link-dark text-decoration-none"
          >
            <h4>STUDENTS</h4>
          </Link>
        </div>
        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-outline-dark pe-3"
            data-bs-toggle="modal"
            data-bs-target="#popup"
          >
            <img className="pb-1" src="/add.svg" height={25} width={20} />
            <span>ADD</span>
          </button>
          <button
          type="button"
          className="btn btn-outline-dark pe-3"
          onClick={presetPage}>
           PRESET
          </button>
        </div>
        {/* add MODAL */}
        <div
          className="modal fade"
          id="popup"
          tabIndex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body px-5">
                <h4 className="text-center mb-2">ADDING TEST</h4>
                <p className="text-start mb-1 ">TEST NUMBER</p>
                <input
                  type="text"
                  className="py-1 px-3 border border-dark w-100 rounded text-start"
                  onChange={(e) => setTestNumber(e.target.value)}
                  value={testNumber}
                />
                <p className="text-start mb-1 ">TEST NAME</p>
                <input
                  type="text"
                  className="py-1 px-3 border border-dark w-100 rounded text-start"
                  onChange={(e) => setTestName(e.target.value)}
                  value={testName}
                />
              </div>
              <div className="modal-footer align-self-center">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    addTest();
                    setTestNumber(""); // Clear test number input
                    setTestName(""); // Clear test name input
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End MODAL */}

        {/* Start */}
        <div className="container-fluid d-flex flex-wrap pt-2 flex-column gap-2 overflow-auto">
          {testpaper.map((test, index) => (
            <div
              className="row py-sm-3 py-5 border border-dark rounded"
              key={index}
            >
              <div className="text-left m-0">
             <p className="m-0">{test.index_number}</p>
              </div>
              <a
                href="/Test/TestPaper"
                className="link-dark text-decoration-none col-11 align-self-center"
              >
                <p className="text-center m-0">
                {test.test_number}: {test.test_name}
                </p>
              </a>
              <div className="col-1 text-end align-self-center p-0 pe-2">
                <img
                  src="/three-dots.svg"
                  width={20}
                  height={23}
                  role="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="pb-1"
                />
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() =>
                      deletetest(
                        test.class_code,
                        test.test_number,
                        test.test_name,
                        test.index_number
                      )
                    }
                  >
                    Remove
                  </button>
                  <button
                  type="button"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target={`#renamePopup${index}`}
                  onClick={() => {
                    setEditTestIndex(index);
                    setEditTestName(test.test_name);
                    setEditTestNumber(test.test_number);
                  }}
                >
                  Rename
                </button>
                </ul>
                {/* rename MOdal */}
                <div
                  className="modal fade"
                  id={`renamePopup${index}`}
                  tabIndex="-1"
                  aria-labelledby="renamePopupLabel"
                  aria-hidden="true"
                  data-bs-backdrop="static"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <button
                        type="button"
                        className="btn-close align-self-end p-3"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                      <div className="modal-header align-self-center pb-0 pt-0">
                        <h5 className="modal-title" id="ModalLabel">
                          RENAME TEST
                        </h5>
                      </div>

                      <div className="modal-body d-flex flex-column pb-2">
                        <h6 className="align-self-start ps-5 ms-2">
                          TEST NUMBER
                        </h6>
                        <input
                          
                          type="text"
                          className="py-1 px-3 border border-dark w-75 rounded align-self-center"
                          onChange={(e) => setTestNumber(e.target.value)}
                          value={testNumber}
                        />

                        <h6 className="align-self-start ps-5 ms-2">
                          TEST NAME
                        </h6>
                        <input
                          type="text"
                          className="py-1 px-3 border border-dark w-75 rounded align-self-center"
                          onChange={(e) => setTestName(e.target.value)}
                          value={testName}
                        />
                      </div>

                      <div className="modal-footer align-self-center">
                        <button
                          type="button"
                          className="btn btn-outline-dark mt-0"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            updateTestNameAndNumber(index);
                            setTestNumber(""); // Clear test number input
                            setTestName(""); // Clear test name input
                          }}
                        >
                          <h6 className="mx-2 my-1">SAVE</h6>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end renameModal */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}