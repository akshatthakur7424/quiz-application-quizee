import React from 'react'
import './stylesheets/FacultyCard.css'



const FacultyCard = (props) => {
  return (
    <div className="card">
        <div className="profilePic">
            <img src={props.profile} alt="Trainer" />
        </div>
        <div className="name"><h1>{props.name}</h1></div>
        <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. r possimus cum.</div>
        <div className="info"><button>Read More</button></div>
    </div>
  )
}

export default FacultyCard