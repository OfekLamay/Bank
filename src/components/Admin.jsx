import React from 'react'
import CustomerPreview from './CustomerPreview'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import UserApprove from './UserApprove'

export default function Admin(props) {

  const navigate = useNavigate()

  const goToHome = () => {
    window.alert("Goodbye admin")
    navigate('/')
  }

  if (props.approveCustomers.length > 0){
    return (
      <div>
          <Header title={"Manager"} />
          <br/>
          <button className='clickbtn' onClick={goToHome}>Logout</button>
          <br/>
          <br/>
          <h2><u><b>Users to approve</b></u></h2>
          <br/>
          {props.approveCustomers.map((customer) => {
              return <UserApprove key={customer.id} user={customer} approveCustomer={props.approveCustomer} noApprove = {props.noApprove} /> 
            })}
          <br/>
          <h2><u><b>Transactions made by each user</b></u></h2>
          <br/>
          {props.allCustomers.map((customer) => {
              return <CustomerPreview key={customer.id} user={customer} deleteUser={props.deleteUser} deleteDeal={props.deleteDeal}/> 
            })}
      </div>
    )}
  else {return (
    <div>
        <Header title={"Manager"} />
        <br/>
        <button className='clickbtn' onClick={goToHome}>Logout</button>
        <br/>
        <br/>
        <h2><u><b>Transactions made by each user</b></u></h2>
        <br/>
        {props.allCustomers.map((customer) => {
            return <CustomerPreview key={customer.id} user={customer} deleteUser={props.deleteUser} deleteDeal={props.deleteDeal}/> 
          })}
    </div>
  )}
}
