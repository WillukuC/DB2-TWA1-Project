import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function SelectRenewableEnergy(props) {

  const navigate = useNavigate();
  const [country1, setCountry1] = useState("")
  const [country2, setCountry2] = useState("")
  const [country3, setCountry3] = useState("")
  const [country4, setCountry4] = useState("")
  const [year, setYear] = useState(0)

  const selectCountry1 = (event) => {
    const country = event.target.value
    if (country != "Select Country" && country != "") {
      setCountry1(country)
    } else {
      setCountry1("")
    }
  }

  const selectCountry2 = (event) => {
    const country = event.target.value
    if (country != "Select Country" && country != "") {
      setCountry2(country)
    } else {
      setCountry2("")
    }
  }

  const selectCountry3 = (event) => {
    const country = event.target.value
    if (country != "Select Country" && country != "") {
      setCountry3(country)
    } else {
      setCountry3("")
    }
  }

  const selectCountry4 = (event) => {
    const country = event.target.value
    if (country != "Select Country" && country != "") {
      setCountry4(country)
    } else {
      setCountry4("")
    }
  }

  const selectYear = (event) => {
    const year = event.target.value
    if (year != "Select year" && year != "") {
      setYear(year)
    } else {
      setYear("")
    }
  }

  const handleNavigate = () => {
    if (country1 == "Select Country" || country1 == "") {
      alert("Please select an option for Country 1")
    } else if (year == 0 || year == "Select Year") {
      alert("Please select a year")
    } else {
      console.log("Calling Graph")

      localStorage.setItem("type", "sustainable")
      localStorage.setItem("country1", country1)
      localStorage.setItem("country2", country2)
      localStorage.setItem("country3", country3)
      localStorage.setItem("country4", country4)
      localStorage.setItem("year", year)

      navigate('/graph-display')
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
          <button onClick={handleNavigate} className='btn bg-light text-dark btn-outline-primary border-3'>Generate Graph</button>
        </div>
      </div>
    </div>
  )
}

export default SelectRenewableEnergy