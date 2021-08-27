import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux/actionCreators/index';

function ApplicantTable() {
    
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState();
    const [error, setError] = useState(0);

    const them = useSelector((state) => state.applicants);
    const dispatch = useDispatch();

    const AC = bindActionCreators(actionCreators, dispatch);
    console.log(AC);
    
    return (
        <>
            {/* search input */}
            <div className="row" style={{ justifyContent: 'center' }}>
                <div className="search-wrapper"><img src='/magGlass.svg' style={{ height: 15 }} /> <input placeholder="Start typing to filter by name..." className="search-input" /></div>
            </div>
            <div className="row mt-2" style={{ alignItems: 'baseline', justifyContent: 'center' }}>
                <div className="row">
                    <div className="left-selector-wrapper">
                        {/* placeholder for now */}
                        <div className="selector-item active">
                            All Candidates (4)
                        </div>
                        <div className="selector-item">
                            Paperwork (1)
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table class="applicant-table">
                        <thead>
                            <tr>
                                <th class="t-head">Candidate</th>
                                <th class="t-head">Date Interviewed</th>
                                <th class="t-head" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="t-item"> Casey McIntosh</td>
                                <td class="t-item"> Thu, Apr 9 2021</td>
                                <td class="t-item"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ApplicantTable

