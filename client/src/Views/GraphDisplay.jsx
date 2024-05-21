import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function GraphDisplay() {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const graphType = localStorage.getItem("type");
      const url = "http://localhost:8080/graph?type=" + graphType;
      console.log(url);

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

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response text:", errorText);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("data: ", data);
      } else if (contentType && contentType.includes("image/png")) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        const text = await response.text();
        console.log("Unexpected response text:", text);
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log("caught errors");
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = imageSrc;
    anchor.download = 'graph.png'; // You can specify the filename here
    anchor.click();
  }

  return (
    <div>
      <Link to="/selection" className='btn bg-light text-dark btn-outline-primary border-3 mt-4 position-absolute top-0 start-0 ms-4'>Back</Link>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col justify-content-center text-center">
            {loading ? (
              <img src="/loading.gif" alt="Loading..." width={100} />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                <img src={imageSrc} alt="Generated graph" style={{ maxWidth: '100%', height: 'auto' }} />
                <button onClick={handleDownload} className="btn btn-primary mt-3">Download Result</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphDisplay;
