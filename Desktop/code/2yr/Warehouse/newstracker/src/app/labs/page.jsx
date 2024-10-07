"use client";
import { useState} from 'react';
import React,{Fragment} from 'react';
import Image from 'next/image';
import searchicon from '@/public/images/icon2.png';

export default function SearchComponent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    if (!input || input.trim() === "") {
      setOutput("Please enter a keyword to search.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        setOutput([]);
      } else {
        setOutput(data.result ? JSON.parse(data.result) : []);
        console.log(output.map((elem) => elem.image));
      }
    } catch (err) {
      setOutput([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isLoading ? (
        <div className="w-[50%] m-auto h-9 mt-8 border-white border flex justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
    if (e.key === 'Enter') {
      getData(); // Call your search function when Enter is pressed
    }
  }}
            type="text"
            className="w-full bg-black overflow-hidden text-white px-2"
          />
          <button onClick={getData}   className="bg-white text-black text-xl font-bold border w-24">
            Search
          </button>
        </div>
      ) : (
        <>
        <div className="w-[50%] m-auto mt-8 flex flex-row justify-center">
          <Image src={searchicon} alt="checklist" className="mt-2 overflow-hidden w-6 h-6 mx-2 bg-white" />
          <div>
            <h1 className="text-white text-xl">
              Results for your query{' '}
              <span
                onClick={() => {
                  setIsLoading(false);
                  setInput("");
                }}
                className="text-3xl mt-3 text-sky-200"
              >
                {input}
              </span>
            </h1>
          </div>
        </div>
        </>)}
      <div className="h-auto m-auto mt-6 p-4 text-white text-lg border overflow-hidden border-white rounded-xl w-[90%]">

      <ul className="grid grid-cols-4 gap-4 w-full align-middle">
       <li className="font-bold text-xl uppercase text-center ">Image</li>
       <li className="font-bold text-xl uppercase text-center ">Title</li>
       <li className="font-bold text-xl uppercase text-center ">link</li>
       <li className="font-bold text-xl uppercase text-center ">Date</li>
     
       {output.map((elem, index) => (
  < >
    <li className="h-full w-full bg-black text-white text-center font-semibolld">
      {elem.image ? (
        <img
          src={elem.image}
          alt={`image-${index}`}
          style={{ height: '200px', width: '200px' }}
        />
      ) : (
        <div style={{ height: '200px', width: '200px', backgroundColor: '#333' }}>
          No Image
        </div>
      )}
    </li>
    <li className="bg-black text-white text-center font-semibolld">
      {elem.title.toUpperCase()}
    </li>
    <li className="overflow-hidden">
      <a href={elem.link} target="_blank" rel="noopener noreferrer">
        {elem.link}
      </a>
    </li>
    <li className="overflow-hidden">
      {new Date(elem.datetime).toDateString()}
    </li>
  </ >
))}

     </ul>

        {/* <h1 className="px-4 w-[200px] text-wrap text-left">{output}</h1> */}
      </div> 
    </div>
  );
}