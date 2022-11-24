import React from 'react'
import { useState } from 'react'
import SpendingPreview from './SpendingPreview';

export default function CustomerPreview(props) {

    const [detailsID, setDetailsID] = useState(props.user.id)
    const [signToShow, setSignToShow] = useState("+")

    const showDetails = () => {
      let currentCName = document.getElementById(detailsID).className;
      if (currentCName == "hide")
      {
        document.getElementById(detailsID).className='show';
        setSignToShow("-")
      }
      else
      {
        document.getElementById(detailsID).className='hide';
        setSignToShow("+")
      }
    }

    const delUser = () => {
        props.deleteUser(detailsID)
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

        
        
        <div id={detailsID} className='hide'>
        {props.user.spendings.map((deals) => {
            return <SpendingPreview spendingData={deals} deleteDeal={props.deleteDeal} userId = {detailsID}/> 
          })}
        </div>
    </div>
    
  )
}
