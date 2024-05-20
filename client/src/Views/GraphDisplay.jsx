import { useEffect, React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function GraphDisplay() {

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:8080/graph?type=test", {
        method: "POST"
      });

      console.log("response: ", response)

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }
      console.log("Trying to get data");
      const data = await response.json();
      console.log("data: ", data)
      setCountries(data)
    } catch (error) {
      console.log("caught errors")
      console.log(error);
    }
  }

  return (
    <div>
      <a href="/selection" className='btn bg-light text-dark btn-outline-primary border-3 mt-4 position-absolute top-0 start-0 ms-4'>Back</a>

    </div>
  )
}

export default GraphDisplay