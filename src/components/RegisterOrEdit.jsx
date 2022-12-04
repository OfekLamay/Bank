import React from 'react'
import Header from './Header'
import { useNavigate } from "react-router-dom";

export default function RegisterOrEdit(props) {
    const navigate = useNavigate()

    const validateDetailsEdit = () => {
        let id = document.getElementById('id').value;
        let name = document.getElementById('name').value;
        let password = document.getElementById('password').value;
        let passwordConfirm = document.getElementById('passwordConfirm').value;

        if (id === "" || name === "" || password === "" || passwordConfirm === "")
        {
            window.alert("Enter all information needed");
            return false;
        }

        // id must be a number, 9 length, positive and of a user that doesn't exist

        if (id.length !== 9)
        {
            window.alert("Id length must be 9");
            return false;
        }

        for (let i = 0; i< id.length; i++)
        {
            if (isNaN(id[i]))
            {
                window.alert("Id must be numbers only");
                return false;
            }
        }

        if(id / 1 < 0) // Only positive numbers
        {
            window.alert("Id must be positive");
            return false;
        }

        // Id OK

        // name's length must be at least 4 

        if (name.length < 4)
        {
            window.alert("name's length must be at least 4");
            return false;
        }

        // name OK

        // password's length must be at least 6 and password should be the same as confirm password

        if (password.length < 6)
        {
            window.alert("password's length must be at least 6");
            return false;
        }

        if (password !== passwordConfirm)
        {
            window.alert("password and confirm password are not the same");
            return false;
        }

        // password OK
        // all OK
        return true;
        
    }

    const editUser = () => {
        if (validateDetailsEdit())
        {
            let id = document.getElementById('id').value;
            let name = document.getElementById('name').value;
            let password = document.getElementById('password').value;
            props.editUser(id, name, password);
            alert("User edited successfully!");
            navigate('/');
        }
    }

    const validateDetailsRegister = () => {
        let id = document.getElementById('id').value;
        let name = document.getElementById('name').value;
        let password = document.getElementById('password').value;
        let passwordConfirm = document.getElementById('passwordConfirm').value;
        let balance = document.getElementById('balance').value;

        if (id === "" || name === "" || password === "" || passwordConfirm === "" || balance === "")
        {
            window.alert("Enter all information needed");
            return false;
        }

        // id must be a number, 9 length, positive and of a user that doesn't exist

        if(props.isExist(id))
        {
            window.alert("There is already a user with the same id");
            return false;
        }

        if (id.length !== 9)
        {
            window.alert("Id length must be 9");
            return false;
        }

        for (let i = 0; i< id.length; i++)
        {
            if (isNaN(id[i]))
            {
                window.alert("Id must be numbers only");
                return false;
            }
        }

        if(id / 1 < 0) // Only positive numbers
        {
            window.alert("Id must be positive");
            return false;
        }

        // Id OK

        // name's length must be at least 4 

        if (name.length < 4)
        {
            window.alert("name's length must be at least 4");
            return false;
        }

        // name OK

        // password's length must be at least 6 and password should be the same as confirm password

        if (password.length < 6)
        {
            window.alert("password's length must be at least 6");
            return false;
        }

        if (password !== passwordConfirm)
        {
            window.alert("password and confirm password are not the same");
            return false;
        }

        // password OK

        // 0 <= balance <= 1,000,000

        if (balance > 1000000 || balance < 0)
        {
            window.alert("balance must be between 0 and 1,000,000");
            return false;
        }

        // balance OK
        // all OK
        return true;
        
    }

    const addUser = () => {
        if (validateDetailsRegister())
        {
            let id = document.getElementById('id').value;
            let name = document.getElementById('name').value;
            let password = document.getElementById('password').value;
            let balance = document.getElementById('balance').value;
            props.addUser(id, name, password, balance);
            alert("We got your details! \nYou can access your account after the admin will approve it");
            navigate('/');
        }
    }

    if (props.type === "Edit") {
        return (
            <div>
                <Header title={"Edit"}/>
                <br /><br />
                <div className='flexboxContainer'>
                    <input type="text" id='id' className='inputLabel' placeholder='ID' />
                    <br /><br />
                    <input type="text" id='name' className='inputLabel' placeholder='Name' />
                    <br /><br />
                    <input type="password" id="password" className='inputLabel' placeholder='Password' />
                    <br /><br />
                    <input type="password" id="passwordConfirm" className='inputLabel' placeholder='Confirm Password' />
                    <br /><br />
                    <button onClick={editUser} className='clickbtn'>Edit</button>
                </div>
            </div>
        )
    }
    else if (props.type === "Register") {
        return (
            <div>
                <Header title={"Register"}/>
                <br /><br />
                <div className='flexboxContainer'>
                    <input type="text" id='id' className='inputLabel' placeholder='ID' />
                    <br /><br />
                    <input type="text" id='name' className='inputLabel' placeholder='Name' />
                    <br /><br />
                    <input type="password" id="password" className='inputLabel' placeholder='Password' />
                    <br /><br />
                    <input type="password" id="passwordConfirm" className='inputLabel' placeholder='Confirm Password' />
                    <br /><br />
                    <input type="number" id="balance" className='inputLabel' placeholder='Money' />
                    <br /><br />
                    <button onClick={addUser} className='clickbtn'>Create</button>
                </div>
            </div>
          )
    }
}
