import React from 'react'
import Header from './Header'
import UserOption from './UserOption'
import { useNavigate } from "react-router-dom";

export default function UserPage(props) {

    const navigate = useNavigate()

    const showBalance = () => {
        alert(`The balance in your account is ${props.user.balance}`)
    }

    const exit = () => {
        alert("Exiting...")
        navigate("/");
    }

    const showPaymentPart = () => {
        document.getElementById('payAction').className='show';
    }

    const preformPayment = () => {
        let amount = document.getElementById('amount').value;
        let reciever = document.getElementById('reciever').value;
        
        if ((amount / 1) < 0)
        {
            alert("Can't pay negative amount");
            return;
        }
        if (reciever.length < 1)
        {
            alert("Please enter the reciever's name");
            return;
        }

        props.pay(props.user.id, amount, reciever);
        document.getElementById('payAction').className='hide';
    }

    const edit = () => {
        navigate("/edit");
    }

  return (
    <div>
        <Header title={"Welcome!"}/>

        <div className='nameLabel'>{props.user.name}</div>
        <br/> <br/>
        <div className='flexboxContainer'>
            <div className='flexboxContainerLine'>
                <UserOption option={"BALANCE"} action={showBalance}/>
                <UserOption option={"PAY"} action={showPaymentPart}/>
            </div>
            <br/> <br/>
            <div className='flexboxContainerLine'>
                <UserOption option={"EXIT"} action={exit}/>
                <UserOption option={"EDIT"} action={edit}/>
            </div>
        </div>
        <br/><br/>
        <div id='payAction' className='hide'>
            <input type="number" id="amount" className='inputLabel' placeholder='Amount' />
            <br/><br/>
            <input type="text" id='reciever' className='inputLabel' placeholder='Reciever' />
            <br/><br/>
            <button onClick={preformPayment} className='clickbtn'>Pay</button>
        </div>
    </div>
  )
}
