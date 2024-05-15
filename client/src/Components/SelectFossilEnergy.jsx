import React from 'react'

function SelectFossilEnergy(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center">
          <p>Select Country</p>
          <select className='form-select' name="countries" id="countries">
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center">
          <p>Select Year</p>
          <select name="year" id="year" className="form-select">
            <option selected>Select Year</option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectFossilEnergy