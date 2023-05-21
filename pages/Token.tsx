import React from 'react'

function Token({bearerToken}: any) {

  return (
    <>
     <div className="form-group">
          <label>Bearer Token:</label>
          <input
            type="text"
            value={bearerToken}
            className="form-control"
          />
        </div>
    </>
  )
}

export default Token