import React from 'react'

function SelectRenewableEnergy(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-3 justify-content-center text-center">
          <p>Select Country 1</p>
          <select className='form-select' name="countries" id="countries">
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Select Country 2<br/>(Optional)</p>
          <select className='form-select' name="countries" id="countries">
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Select Country 3<br/>(Optional)</p>
          <select className='form-select' name="countries" id="countries">
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
        <div className="col-3 justify-content-center text-center">
          <p>Select Country 4<br/>(Optional)</p>
          <select className='form-select' name="countries" id="countries">
            <option selected>Select Country</option>
            {props.countries.map((x, y) =>
              <option key={y}>{x}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SelectRenewableEnergy