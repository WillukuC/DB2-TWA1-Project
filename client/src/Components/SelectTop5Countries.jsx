import { React, useState } from 'react'

function SelectTop5Countries(props) {
  const [data, setData] = useState("")
  const [year, setYear] = useState(0)

  const selectData = (event) => {
    setData(event.target.value)
  }

  const selectYear = (event) => {
    setYear(event.target.value)
  }

  const handleSend = () => {
    if (data == "Select Data" || data == "") {
      alert("Please select a data option")
    } else if (year == 0 || year == "Select Year") {
      alert("Please select a year")
    } else {
      console.log(data, year)
    }
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center mt-3">
          <p>Data</p>
          <select name="year" id="year" className="form-select" onChange={selectData}>
            <option selected>Select Data</option>
            <option value="ghg">GHG Emissions</option>
            <option value="gdp">GDP</option>
            <option value="pop">Population</option>
          </select>
        </div>
        <div className="col-3 justify-content-center text-center mt-3">
          <p>Year</p>
          <select name="year" id="year" className="form-select" onChange={selectYear}>
            <option selected>Select Year</option>
            {props.years.map((x, y) =>
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

export default SelectTop5Countries