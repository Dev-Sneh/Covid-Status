import React, { useState, useEffect } from 'react';
import './Coviddata.css';
function Coviddata() {
    const [covidData, setCovidData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://api.rootnet.in/covid19-in/stats/latest')
            .then((response) => response.json())
            .then((data) => setCovidData(data.data.regional));
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = covidData.filter((item) =>
        item.loc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-light py-5">
            <div className="container">
                <h2 className="text-center mb-5">COVID STATUS</h2>
                <div className="row">
                    <div className="col-12 col-md-6 mx-auto">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search by State"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="row">
                    {filteredData.map((item) => (
                        <div className="col-12 col-md-6 mx-auto mb-3" key={item.loc}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.loc}</h5>
                                    <p className="card-text">Confirmed Case In India: {item.confirmCasesIndian}</p>
                                    <p className="card-text">Confirmed Case In Foreign: {item.confirmedCasesForeign}</p>
                                    <p className="card-text"> Total Confirmed cases: {item.totalConfirmed}</p>
                                    <p className="card-text">Recovered cases: {item.discharged}</p>
                                    <p className="card-text">Deaths: {item.deaths}</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coviddata;
