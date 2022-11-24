import React from 'react'

export default function UserApprove(props) {

    const addUser = () => {
        props.approveCustomer(props.user.id, props.user.name, props.user.password, props.user.balance)
    }

    const cancelUser = () => {
        props.noApprove(props.user.id)
    }

    return (
        <div>
            <div className='customerPreview'>
                <div className='customerDetail'><u>id</u>: {props.user.id}</div>
                <div className='customerDetail'><u>name</u>: {props.user.name}</div>
                <div className='customerDetail'><u>balance</u>: {props.user.balance}</div>
                <div className='flexboxContainerLine'>
                    <div className='clickNav' onClick={addUser}>Add</div>
                    <div className='clickNav' onClick={cancelUser}>Cancel</div>
                </div>
            </div>
        </div>
    )

}
