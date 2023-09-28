"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useTupcid } from '@/app/provider';

export default function AnswerSheet() {
  const { tupcids } = useTupcid();
  const [testType, setTestType] = useState('Create Test Paper First....');
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [highestQuestionNumber, setHighestQuestionNumber] = useState(0);

  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const handleGenerate = () => {
    // Add your logic here to generate the test based on the selected type and number of questions
    console.log('Test Type:', testType);
    console.log('Number of Questions:', numberOfQuestions);
  };

  const fetchQtypeandQn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getquestionstypeandnumber/${tupcids}/${uid}`
      );
      if (response.status === 200) {
        const { testType, questionNumbers, questionTypes } = response.data;
  
        setTestType(testType || 'Create Test Paper First');
  
        // Filter out unique question types
        const uniqueQuestionTypes = [...new Set(questionTypes)];
  
        // Create an object to store the highest question number for each unique type
        const highestQuestionNumbers = {};
  
        // Calculate the highest number for each unique question type
        uniqueQuestionTypes.forEach((type) => {
          const typeQuestionNumbers = questionNumbers.filter(
            (number, index) => questionTypes[index] === type
          );
          const highestNumber = Math.max(...typeQuestionNumbers);
          if (highestNumber !== 0) {
            highestQuestionNumbers[type] = highestNumber;
          }
        });
  
        // Construct an array of elements for each type and highest number
        const questionTypesElements = Object.entries(highestQuestionNumbers).map(
          ([type, highestNumber]) => ({
            type,
            highestNumber,
          })
        );
  
        // Set the state variables
        setQuestionTypes(uniqueQuestionTypes);
        setQuestionNumbers(highestQuestionNumbers);
  
        // Calculate the highest number overall
        const highestNumber = Math.max(...Object.values(highestQuestionNumbers));
        setNumberOfQuestions(highestNumber || 0);
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
          <div className="row p-sm-2 px-3">
            <p className="col-sm-4 my-1 text-sm-start text-center">TYPE OF TEST</p>
            <div className="col-sm-8">
              {questionTypes.map((type, index) => (
                !isNaN(questionNumbers[type]) && (
                  <div key={index} className="d-flex">
                    <input
                      type="text"
                      className="form-control py-1 px-3 rounded border border-dark text-sm-start text-center"
                      value={type}
                      readOnly
                    />
                    <span className="ms-2">
                      Number of Questions: {questionNumbers[type]}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
          <form className="row p-sm-2 px-3">
            <p className="col-4 my-1 text-sm-start text-center pe-0">NUMBER OF QUESTIONS</p>
            <input
              type="number"
              className="py-1 px-3 col-2 rounded border border-dark text-sm-start text-center"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              readOnly
            />
          </form>
          <div className="text-center">
            <button className="btn btn-outline-dark px-sm-5 mt-2 mt-sm-0" onClick={handleGenerate}>
              GENERATE
            </button>
          </div>
        </section>
        {/* END CONTENT */}
      </section>
    </main>
  );
}
