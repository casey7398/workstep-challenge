import axios from "axios";
import React, { useEffect, useState } from "react";

function ApplicantTable() {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState();
  const [error, setError] = useState(0);

  const RenderedApplicant = () => {
    return (
      <>
        {applicants && applicants.map((applicant) => {
          return (
            <>
              <tr key={applicant.id}>
                <td class="t-item"> {applicant.name}</td>
                <td class="t-item"> {applicant.time_interview}</td>
                <td class="t-item"></td>
              </tr>
            </>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    axios
      .get(
        `https://my-json-server.typicode.com/workstep/react-challenge-data/candidates`
      )
      .then((res) => {
        console.log("res.data", res.data);
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
          />
        </div>
      </div>
      <div
        className="row mt-2"
        style={{ alignItems: "baseline", justifyContent: "center" }}
      >
        <div className="row">
          <div className="left-selector-wrapper">
            {/* placeholder for now */}
            <div className="selector-item active">All Candidates (4)</div>
            <div className="selector-item">Paperwork (1)</div>
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
              <RenderedApplicant />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ApplicantTable;
