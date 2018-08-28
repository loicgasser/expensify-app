// Higher order component (HOC) - a component that render another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>{props.details}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This info is private, please don't share</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)

ReactDOM.render(<AdminInfo isAdmin={true} details="These are the details" />, document.getElementById('app'))