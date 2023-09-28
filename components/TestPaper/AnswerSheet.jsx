"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useTupcid } from '@/app/provider';

export default function AnswerSheet() {
  const { tupcids } = useTupcid();
  const [testType, setTestType] = useState('Create Test Paper First....');
  const [testData, setTestData] = useState([]);

  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const testname = searchParams.get("testname");




   const generateAnswersheet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/generateAnswerSheet/${uid}`
      );

      if (response.status === 200) {
        // Trigger the download of the generated Word document
        const blob = new Blob([response.data], { type: 'application/msword' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${testname}_answersheet.docx`;
        a.click();
      } else {
        console.error("Failed to generate Word document.");
      }
    } catch (error) {
      console.error("Error generating Word document:", error);
    }
  };

  const handleGenerate = () => {
    // Call the function to generate the Word document
    generateAnswersheet();
    
  };

  const fetchQtypeandQn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getquestionstypeandnumber/${tupcids}/${uid}`
      );
      if (response.status === 200) {
        const { testType, questionNumbers, questionTypes } = response.data;

        setTestType(testType || 'Create Test Paper First');

        // Create an object to store the highest question number for each unique type
        const highestQuestionNumbers = {};

        // Calculate the highest number for each unique question type
        questionTypes.forEach((type, index) => {
          const highestNumber = highestQuestionNumbers[type] || 0;
          if (questionNumbers[index] > highestNumber) {
            highestQuestionNumbers[type] = questionNumbers[index];
          }
        });

        // Filter out unique question types
        const uniqueQuestionTypes = [...new Set(questionTypes)];

        // Organize data by type of test
        const organizedTestData = uniqueQuestionTypes.map((type) => ({
          type,
          highestNumber: highestQuestionNumbers[type],
        }));

        // Filter out entries with no data for "TYPE OF TEST" and "NUMBER OF QUESTIONS"
        const filteredTestData = organizedTestData.filter(
          (item) => item.type && item.highestNumber
        );

        // Set the state variable
        setTestData(filteredTestData);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchQtypeandQn function when the component mounts
  useEffect(() => {
    fetchQtypeandQn();
  }, []);

  return (
    <main className="container-fluid p-sm-4 py-3 h-100">
      <section>
        <div className="d-flex">
          <a className="align-self-center" href="/Classroom/F/Test">
            <img src="/back-arrow.png" alt="Back" />
          </a>
          &nbsp;
          <h3 className="m-0">&#123;TEST NO&#125;&#58;&#123;TEST NAME&#125;</h3>
        </div>
        <ul className="d-flex flex-wrap justify-content-around mt-3 list-unstyled">
          <a href="/Test/TestPaper" className="text-decoration-none link-dark">
            <li className="m-0 fs-5">TEST PAPER</li>
          </a>
          <a>
            <li className="m-0 fs-5 text-decoration-underline">ANSWER SHEET</li>
          </a>
          <a href="/Test/AnswerKey" className="text-decoration-none link-dark">
            <li className="m-0 fs-5">ANSWER KEY</li>
          </a>
          <a href="/Test/Records" className="text-decoration-none link-dark">
            <li className="m-0 fs-5">RECORDS</li>
          </a>
        </ul>
        {/* CONTENT */}
        <section className="container-sm mt-5 col-xl-6 py-3 px-4 border border-dark rounded">
          {testData.length > 0 ? (
            testData.map((item, index) => (
              <div key={index} className="row p-sm-2 px-3">
                <p className="col-sm-12 my-1 text-center">
                   TYPE OF TEST: {item.type} NUMBER OF QUESTIONS: {item.highestNumber}
                </p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
          <div className="text-center">
            {testData.length > 0 && (
              <button
                className="btn btn-outline-dark px-sm-5 mt-2 mt-sm-0"
                onClick={handleGenerate}
              >
                GENERATE
              </button>
            )}
          </div>
        </section>
        {/* END CONTENT */}
      </section>
    </main>
  );
}
