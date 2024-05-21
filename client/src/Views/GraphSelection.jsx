import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import SelectFossilEnergy from '../Components/SelectFossilEnergy';
import SelectRenewableEnergy from '../Components/SelectRenewableEnergy';
import SelectTop5Countries from '../Components/SelectTop5Countries';
import SelectNuclearGraph from '../Components/SelectNuclearGraph';

function GraphSelection() {

    const navigate = useNavigate();
    const [graphOption, setGraphOption] = useState("fossil");
    const [countries, setCountries] = useState([])

    useEffect(() => {
        callCountries();
        localStorage.clear()
    }, []);

    const callCountries = async () => {
        try {
            const response = await fetch("/countries", {
                method: "GET"
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
            setCountries(data)
        } catch (error) {
            console.log("caught errors")
            console.log(error);
        }
    }

    const showPanel = (panelNum) => {
        var panel = document.getElementById(panelNum)
        panel.classList.remove('d-none')
        panel.classList.add('d-block')
    }

    const hidePanel = (panelNum) => {
        var panel = document.getElementById(panelNum)
        panel.classList.remove('d-block')
        panel.classList.add('d-none')
    }

    // code for switching panels based on the current graph goes here
    const changeGraph = () => {
        switch (graphOption) {
            case "fossil":
                hidePanel("panel1")
                showPanel("panel2")
                hidePanel("panel3")
                hidePanel("panel4")
                hidePanel("panel5")
                break;
            case "renewable":
                hidePanel("panel1")
                hidePanel("panel2");
                showPanel("panel3");
                hidePanel("panel4");
                hidePanel("panel5");
                break;
            case "top5":
                hidePanel("panel1")
                hidePanel("panel2");
                hidePanel("panel3");
                showPanel("panel4");
                hidePanel("panel5");
                break;
            case "nuclear":
                hidePanel("panel1")
                hidePanel("panel2");
                hidePanel("panel3");
                hidePanel("panel4");
                showPanel("panel5");
                break;
            default:
        }
    }

    const hideGraphPanel = () => {
        showPanel("panel1")
        hidePanel("panel2");
        hidePanel("panel3");
        hidePanel("panel4");
        hidePanel("panel5")
    }

    const years = [];
    const currentYear = new Date().getFullYear()
    for (let year = currentYear; year >= 1970; year--) {
      years.push(year);
    }

    const navHome = () => {
        navigate('/')
    }

    return (
        <div>
            <button onClick={navHome} className='btn bg-light text-dark btn-outline-primary border-3 mt-4 position-absolute top-0 start-0 ms-4'>To Homepage</button>
            <div className="container panel panel-default d-block" id='panel1'>
                <div className="row justify-content-center">
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphOption("fossil")} >
                            <img src="/graph-fossil.png" className='mx-auto' alt="Fossil Energy Consumption" style={{ width: '50px' }} />
                            <p>Fossil Energy Consumption</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphOption("renewable")} >
                            <img src="/graph-renewable.png" className='mx-auto' alt="Sustainable Energy Consumption" style={{ width: '50px' }} />
                            <p>Sustainable Energy Consumption</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphOption("top5")} >
                            <img src="/graph-top5.png" className='mx-auto' alt="Top 5 Countries" style={{ width: '50px' }} />
                            <p>Top 5 Countries Graph</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card btn border-3" onClick={() => setGraphOption("nuclear")} >
                            <img src="/graph-nuclear.png" className='mx-auto' alt="Custom Graph" style={{ width: '50px' }} />
                            <p>Nuclear Energy Consumption</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 row">
                    <div className="col text-center">
                        <div className="btn bg-light text-dark btn-outline-primary border-3" onClick={() => changeGraph()}>Select Graph Type</div>
                    </div>
                </div>
            </div>
            <div className="container panel panel-default d-none" id='panel2'>
                <button className='btn bg-light text-dark btn-outline-primary border-3 position-relative top-0 start-0 ms-4 my-3' onClick={() => hideGraphPanel()}>Back</button>
                <SelectFossilEnergy countries={countries} />
            </div>
            <div className="container panel panel-default d-none" id='panel3'>
                <button className='btn bg-light text-dark btn-outline-primary border-3 position-relative top-0 start-0 ms-4 my-3' onClick={() => hideGraphPanel()}>Back</button>
                <SelectRenewableEnergy countries={countries} years={years}/>
            </div>
            <div className="container panel panel-default d-none" id='panel4'>
                <button className='btn bg-light text-dark btn-outline-primary border-3 position-relative top-0 start-0 ms-4 my-3' onClick={() => hideGraphPanel()}>Back</button>
                <SelectTop5Countries years={years}/>
            </div>
            <div className="container panel panel-default d-none" id='panel5'>
                <button className='btn bg-light text-dark btn-outline-primary border-3 position-relative top-0 start-0 ms-4 my-3' onClick={() => hideGraphPanel()}>Back</button>
                <SelectNuclearGraph countries={countries} />
            </div>
        </div>
    )
}

export default GraphSelection