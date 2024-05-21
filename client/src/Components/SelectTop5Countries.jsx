import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function SelectTop5Countries(props) {

  const navigate = useNavigate();
  const [data, setData] = useState("")

  const selectData = (event) => {
    setData(event.target.value)
  }

  const handleNavigate = () => {
    if (data == "Select Data" || data == "") {
      alert("Please select a data option")
    } else {
      console.log("Calling Graph")

      localStorage.setItem("type", "top")
      localStorage.setItem("data", data)

      navigate('/graph-display')
    }
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center mt-3">
          <p>Data</p>
          <select name="data" id="data" className="form-select" onChange={selectData}>
            <option selected>Select Data</option>
            <option value="greenhouse_gas_emissions">GHG Emissions</option>
            <option value="gdp">GDP</option>
            <option value="population">Population</option>
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

export default SelectTop5Countries