import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";

function ApplicantTable() {
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState();
    const [filteredApplicants, setFilteredApplicants] = useState();
    const [error, setError] = useState(0);
    const [selectedStep, setSelectedStep] = useState("All");

    const paperworkCount = applicants && applicants.filter(x => x.step === 'Paperwork').length
    const backgroundCount = applicants && applicants.filter(x => x.step === 'Background Check').length
    const testCount = applicants && applicants.filter(x => x.step === 'Drug Test').length

    const updateStep = (e, applicant) => {
        const selectedStep = e.target.value;
        console.log(selectedStep);
        axios
            .patch(
                `https://my-json-server.typicode.com/workstep/react-challenge-data/candidates/${applicant.id}`,
                { step: selectedStep }
            )

        // to do: api error handling
        // to do: fetch fresh applicant data after setting new value?
    };

    const StepValues = ({ currentStep, applicant }) => {
        return (
            <select value={currentStep} onChange={e => updateStep(e, applicant)}>
                <option value="">CHOOSE STEP</option>
                <option value="Paperwork">PAPERWORK</option>
                <option value="Background Check">BACKGROUND CHECK</option>
                <option value="Drug Test">DRUG TEST</option>
            </select>
        )
    }

    const RenderedApplicant = () => {
        return (
            <>

                {filteredApplicants ? filteredApplicants.map((applicant) => {
                    return (
                        <>
                            <tr key={applicant.id}>
                                <td className="t-item"> {applicant.name}</td>
                                <td className="t-item"> {moment(applicant.time_interview).format('ddd, MMM Do')}</td>
                                <td className="t-item"> <StepValues currentStep={applicant.step} applicant={applicant} /></td>
                            </tr>
                        </>
                    );
                }) : applicants && applicants.map((applicant) => {
                    return (
                        <>
                            <tr key={applicant.id}>
                                <td className="t-item"> {applicant.name}</td>
                                <td className="t-item"> {moment(applicant.time_interview).format('ddd, MMM Do')}</td>
                                <td className="t-item"> <StepValues currentStep={applicant.step} applicant={applicant} /></td>
                            </tr>
                        </>
                    );
                })
                }
            </>
        );
    };

    const filterResults = (category) => {
        setSelectedStep(category);
        if (category !== 'All') {
            setFilteredApplicants(applicants.filter(x => x.step === category));
        } else {
            setFilteredApplicants(null)
        }
    }

    const searchResults = (e) => {
        console.log(e.target.value)
        if (e.target.value !== '') {
            setFilteredApplicants(applicants.filter(x => x.name.includes(e.target.value)));
        } else {
            setFilteredApplicants(null)
        }
    }

    useEffect(() => {
        axios
            .get(
                `https://my-json-server.typicode.com/workstep/react-challenge-data/candidates`
            )
            .then((res) => {
                if (res.data) {
                    setApplicants(res.data);
                } else {
                    setError(404);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <>
            {/* search input */}
            <div className="row" style={{ justifyContent: "center" }}>
                <div className="search-wrapper">
                    <img src="/magGlass.svg" style={{ height: 15 }} />{" "}
                    <input
                        placeholder="Start typing to filter by name..."
                        className="search-input"
                        onChange={searchResults}
                    />
                </div>
            </div>
            <div
                className="row mt-2"
                style={{ alignItems: "baseline", justifyContent: "center" }}
            >
                <div className="row">
                    <div className="left-selector-wrapper">
                        <div className={`selector-item ${selectedStep === 'All' && 'active'}`} onClick={() => filterResults('All')}>All Candidates {`( ${applicants && applicants.length} )`}</div>
                        <div className={`selector-item ${selectedStep === 'Paperwork' && 'active'}`} onClick={() => filterResults('Paperwork')}>Paperwork {paperworkCount > 0 && `( ${paperworkCount} )`}</div>
                        <div className={`selector-item ${selectedStep === 'Background Check' && 'active'}`} onClick={() => filterResults('Background Check')}>Background {backgroundCount > 0 && `( ${backgroundCount} )`}</div>
                        <div className={`selector-item ${selectedStep === 'Drug Test' && 'active'}`} onClick={() => filterResults('Drug Test')}>Drug Test {testCount > 0 && `( ${testCount} )`}</div>

                    </div>
                </div>
                <div className="table-container">
                    <table className="applicant-table">
                        <thead>
                            <tr>
                                <th className="t-head">Candidate</th>
                                <th className="t-head">Date Interviewed</th>
                                <th className="t-head" />
                            </tr>
                        </thead>
                        <tbody>
                            <RenderedApplicant />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ApplicantTable;
