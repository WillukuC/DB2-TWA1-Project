import { useState } from 'react'
import React from 'react'
import SelectBarGraph from '../Components/SelectBarGraph';
import SelectLineGraph from '../Components/SelectLineGraph';
import SelectPieGraph from '../Components/SelectPieGraph';

function GraphSelection() {

    const [graphType, setGraphType] = useState("");

    // code for switching panels based on the current graph goes here

    return (
        <div>
            <a href="/" className='btn bg-light text-dark btn-outline-primary border-3 mt-4 position-absolute top-0 start-0 ms-4'>Back</a>
            <div className="container panel panel-default">
                <div className="row justify-content-center">
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphType("line")} >
                            <img src="/chart-line.png" className='mx-auto' alt="Line Chart" style={{ width: '50px' }} />
                            <p>Line Chart</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphType("bar")} >
                            <img src="/chart-bar.png" className='mx-auto' alt="Bar Chart" style={{ width: '50px' }} />
                            <p>Bar Chart</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphType("pie")} >
                            <img src="/chart-pie.png" className='mx-auto' alt="Pie Chart" style={{ width: '50px' }} />
                            <p>Pie Chart</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 row">
                    <div className="col text-center">
                        <div className="btn bg-light text-dark btn-outline-primary border-3" onClick={() => console.log(graphType)}>Select Graph Type</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphSelection