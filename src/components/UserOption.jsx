import React from 'react'

export default function UserOption(props) {
  return (
    <div onClick={props.action} className='smallClickDiv'>
        {props.option}
    </div>
  )
}
