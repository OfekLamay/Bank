import React from 'react'
import { useState } from 'react'
import SpendingPreview from './SpendingPreview';

export default function CustomerPreview(props) {

    // const [detailsID, setDetailsID] = useState(props.user.id)
    const [signToShow, setSignToShow] = useState("+")

    const showDetails = () => {
      let currentCName = document.getElementById(props.user.id).className;
      if (currentCName === "hide")
      {
        document.getElementById(props.user.id).className='show';
        setSignToShow("-")
      }
      else
      {
        document.getElementById(props.user.id).className='hide';
        setSignToShow("+")
      }
    }

    const delUser = () => {
        props.deleteUser(props.user.id)
    }

  return (
    <div className='customerPreview'>
      <div className='customerDetails'>
        <div onClick={delUser} className='deleteNav'>Delete User</div>
          <br />
            <div className='flexboxContainerLine'>
              <div onClick={showDetails} className='clickNav'>{signToShow}</div>
            <div >{props.user.name}</div>
        </div>
      </div>

        
        
        <div id={props.user.id} className='hide'>
        {props.user.spendings.map((deals) => {
            return <SpendingPreview key={deals.id} spendingData={deals} deleteDeal={props.deleteDeal} userId = {props.user.id}/> 
          })}
        </div>
    </div>
    
  )
}
