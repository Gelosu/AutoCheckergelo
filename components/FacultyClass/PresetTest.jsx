"use client";

import Link from "next/link";
import { useTupcid } from "@/app/provider";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PresetTest() {
  const { tupcids } = useTupcid();
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredTestpapers, setFilteredTestpapers] = useState([]);
  const [testpapers, setTestpapers] = useState([]);

  const fetchAndSetTestpapers = async () => {
    try {
      console.log("gwtting preset in...", tupcids);
      const response = await axios.get(
        `http://localhost:3001/gettestpapers/${tupcids}`
      );
      if (response.status === 200) {
        setTestpapers(response.data);
        setFilteredTestpapers(response.data);
      } else {
        console.error("Error fetching testpapers");
      }
    } catch (error) {
      console.error("Error fetching testpapers:", error);
    }
  };

  // Initial data fetch and setup
  useEffect(() => {
    fetchAndSetTestpapers();
  }, [tupcids]); // Fetch data whenever `tupcids` changes

  const renderButtons = (testpaper) => (
    <div className="p-3 d-flex gap-1">
      <img className="border-end border-dark p-1" src="/add2.svg" alt="add"  height={30} width={30} onClick={() => handleAdd(testpaper)}/>
      <img className="border-end border-dark p-1" src="/share.svg" alt="share" height={30} width={30} onClick={() => handleShare(testpaper)} />
      <img className="p-1" src="/show.svg" alt="show" height={30} width={30} onClick={() => handlePreview(testpaper)}/>
    </div>
  );

  // Event handlers for the buttons
  const handleAdd = (testpaper) => {
    // Handle Add button click
    // Implement the logic to add the test paper here
    console.log(`Adding test paper ${testpaper.uid}`);
  };

  const handleShare = (testpaper) => {
    // Handle Share button click
    // Implement the logic to share the test paper here
    console.log(`Sharing test paper ${testpaper.uid}`);
  };

  const handlePreview = (testpaper) => {
    // Handle Preview button click
    // Implement the logic to preview the test paper here
    console.log(`Previewing test paper ${testpaper.uid}`);
  };

  const filterTestpapers = () => {
    const filtered = testpapers.filter((testpaper) => {
      if (selectedYear === "All") return true;
      const createdDate = new Date(testpaper.created_at);
      const year = createdDate.getFullYear().toString();
      return year === selectedYear;
    });
    setFilteredTestpapers(filtered);
  };

  const yearOptionStyle = {
    cursor: "pointer",
  };
  const uniqueYears = [
    "All",
    ...Array.from(
      new Set(
        testpapers.map((testpaper) =>
          new Date(testpaper.created_at).getFullYear().toString()
        )
      )
    ).sort(),
  ];

  return (
    <main className="custom-m col-11 col-md-10 p-0">
      <section className="container-fluid p-sm-4 py-3 ">
        <div className="d-flex align-items-center">
          <Link href="http://localhost:3000/Classroom/F">
            <img src="/back-arrow.svg" height={30} width={40} />
          </Link>
          <h2 className="m-0">{tupcids}</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center ">
          <h3 className="pt-3 m-0 ">PRESETS</h3>
          <h6 className="pt-3 m-0 d-flex pe-2">
            Sort:
            <span className="custom-dropdown-container rounded text-center">
              <input id="cdd" type="checkbox" className="custom-dropdown" />
              <label htmlFor="cdd">
                <div role="button">
                  <span className="text-decoration-underline">{selectedYear || uniqueYears[0]}</span>
                </div>
              </label>
              <span className="custom-dropdown-item container-fluid">
                <div className="d-flex flex-column gap-2 justify-content-center">
                  {uniqueYears.map((year) => {
                    const isYearSelected = year === selectedYear;
                    return (
                      <div
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          filterTestpapers();
                        }}
                        className={`col-12 d-flex flex-column rounded text-center ${
                          isYearSelected ? "border border-dark" : ""
                        }`}
                        style={yearOptionStyle}
                      >
                        <span>{year}</span>
                      </div>
                    );
                  })}
                </div>
              </span>
            </span>
          </h6>
        </div>

        {/* Clases */}
        <div className="row">
          {filteredTestpapers.map((testpaper) => (
            <div
              key={testpaper.uid}
              className="col-12 d-flex flex-column"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center border border-dark text-end pe-2 ps-2 rounded mb-1">
                <div>
                  <span>UID: {testpaper.uid}</span>
                  <span>Test Name: {testpaper.test_name}</span>
                  <span>Class Name: {testpaper.class_name}</span>
                </div>
                {renderButtons(testpaper)}
              </div>
            </div>
          ))}
        </div>
        {/* Classes */}
      </section>
    </main>
  );
}
