import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function SelectFossilEnergy(props) {

  const navigate = useNavigate();
  const [country, setCountry] = useState("")
  
  const selectCountry = (event) => {
    setCountry(event.target.value)
  }

  const handleNavigate = () => {
    if (country == "Select Country" || country == "") {
      alert("Please select a country")
    } else {
      console.log("Calling Graph")

      localStorage.setItem("type", "fossil")
      localStorage.setItem("country1", country)

      navigate('/graph-display')
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
          <button onClick={handleNavigate} className='btn bg-light text-dark btn-outline-primary border-3'>Generate Graph</button>
        </div>
      </div>
    </div>
  )
}

export default SelectFossilEnergy