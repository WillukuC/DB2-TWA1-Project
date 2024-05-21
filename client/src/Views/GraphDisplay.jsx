import { useEffect, React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function GraphDisplay() {

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const graphType = localStorage.getItem("type")
      const url = "http://localhost:8080/graph?type=" + graphType
      console.log(url)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          country1: localStorage.getItem("country1"),
          country2: localStorage.getItem("country2"),
          country3: localStorage.getItem("country3"),
          country4: localStorage.getItem("country4"),
          year: localStorage.getItem("year"),
          data: localStorage.getItem("data")
        })
      });

      console.log("response: ", response)

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob)
      setImageSrc(imageUrl)
    } catch (error) {
      console.log("caught errors")
      console.log(error);
    }
  }

  return (
    <div>
      <a href="/selection" className='btn bg-light text-dark btn-outline-primary border-3 mt-4 position-absolute top-0 start-0 ms-4'>Back</a>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            {imageSrc && <img src={imageSrc} alt="Graph" width={600}/>}
            <p>Source: </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphDisplay