import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


function SelectFossilEnergy(props) {

  const navigate = useNavigate();
  const [country, setCountry] = useState("")
  
  const selectCountry = (event) => {
    setCountry(event.target.value)
  }

  const handleSend = () => {
    if (country == "Select Country" || country == "") {
      alert("Please select a country")
    } else {
      console.log("Calling Graph")
      callGraph()
    }
  }

  const callGraph = async () => {
    try {
        const response = await fetch("http://localhost:8080/graph?type=fossil", {
            method: "POST",
            body: JSON.stringify({
              "country1": country
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
        navigate("/graph-display")
      } catch (error) {
        console.log("caught errors")
        console.log(error);
    }
}

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center">
          <p>Country</p>
          <select className='form-select' name="countries" id="countries" onChange={selectCountry}>
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center mt-3">
          <button onClick={handleSend} className='btn bg-light text-dark btn-outline-primary border-3'>Generate Graph</button>
        </div>
      </div>
    </div>
  )
}

export default SelectFossilEnergy