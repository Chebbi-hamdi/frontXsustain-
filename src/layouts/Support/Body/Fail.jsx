import React from 'react'
import './Fail.css'; // Import a CSS file to style your component

const Fail = () => {
  return (
    <div className="fail-page">
      <h1>Operation Failed</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  )
}

export default Fail