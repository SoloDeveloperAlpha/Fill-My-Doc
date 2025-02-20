import React from 'react'

export default function NOFILE() {
  return (
    <div className="cont_not_found">
      <div className="page_not_found">
        <div className="error_mssg">
          <span style={{ fontSize: "1em", color: "gray" }}>NO SEARCH RESULTS</span>
          <h1 style={{ fontSize: "8em", color: "gray" }}>404</h1>
          <span style={{ fontSize: "1.5em", fontWeight: "bold", color: "gray" }}> PAGE NOT FOUND</span>
        </div>
      </div>
    </div >
  )
}
