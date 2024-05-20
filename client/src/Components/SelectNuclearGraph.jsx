import { React, useState } from 'react'

function SelectNuclearGraph(props) {
  const [country, setCountry] = useState("")

  const selectCountry = (event) => {
    setCountry(event.target.value)
  }

  const handleSend = () => {
    if (country == "Select Country" || country == "") {
      alert("Please select a country")
    } else {
      console.log(country)
    }
  }
  return (
    <div>
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

export default SelectNuclearGraph