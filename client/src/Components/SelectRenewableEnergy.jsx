import { React, useState } from 'react'

function SelectRenewableEnergy(props) {
  const [country1, setCountry1] = useState("")
  const [country2, setCountry2] = useState("")
  const [country3, setCountry3] = useState("")
  const [country4, setCountry4] = useState("")
  const [year, setYear] = useState(0)
  
  const selectCountry1 = (event) => {
    setCountry1(event.target.value)
  }

  const selectCountry2 = (event) => {
    setCountry2(event.target.value)
  }

  const selectCountry3 = (event) => {
    setCountry3(event.target.value)
  }

  const selectCountry4 = (event) => {
    setCountry4(event.target.value)
  }

  const selectYear = (event) => {
    setYear(event.target.value)
  }

  const handleSend = () => {
    if (country1 == "Select Country" || country1 == "") {
      alert("Please select an option for Country 1")
    } else if (year == 0 || year == "Select Year"){
      alert("Please select a year")
    } else {
      console.log(country1, country2, country3, country4, year)
    }
  }
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center">
          <p>Country 1</p>
          <select className='form-select' name="countries" id="countries" onChange={selectCountry1}>
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Country 2 (Optional)</p>
          <select className='form-select' name="countries" id="countries" onChange={selectCountry2}>
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Country 3 (Optional)</p>
          <select className='form-select' name="countries" id="countries" onChange={selectCountry3}>
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Country 4 (Optional)</p>
          <select className='form-select' name="countries" id="countries" onChange={selectCountry4}>
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
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

export default SelectRenewableEnergy