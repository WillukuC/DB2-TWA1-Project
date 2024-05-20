import { useEffect, React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function GraphDisplay() {

  const [country1, setCountry1] = useState("")
  const [country2, setCountry2] = useState("")
  const [country3, setCountry3] = useState("")
  const [country4, setCountry4] = useState("")
  const [year, setYear] = useState(0)
  const [info, setInfo] = useState("")

  useEffect(() => {

    setCountry1(localStorage.getItem("country1"))
    setCountry2(localStorage.getItem("country2"))
    setCountry3(localStorage.getItem("country3"))
    setCountry4(localStorage.getItem("country4"))
    setYear(localStorage.getItem("year"))
    setInfo(localStorage.getItem("data"))

    getImage();
  }, []);

  const getImage = async () => {
    try {
      const graphType = localStorage.getItem("type")
      const url = "http://localhost:8080/graph?type=" + graphType

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          country1: country1,
          country2: country2,
          country3: country3,
          country4: country4,
          year: year,
          data: info
        })
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <img src="" alt="" />
            <p>Source: </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphDisplay