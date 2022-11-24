import React from 'react'

export default function SpendingPreview(props) {

    const deleteDeal = () =>
    {
        props.deleteDeal(props.userId, props.spendingData.id)
    }

  return (
    <div>

        <div className='spendingContainerLine'>
          {props.spendingData.company} : {props.spendingData.amount}
          <div onClick={deleteDeal} className='clickDeal'>X</div>
        </div>
    </div>
  )
}
