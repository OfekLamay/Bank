import './App.css';
import {useState} from 'react';
import {HashRouter as Router, Routes , Route} from 'react-router-dom';

// components
import Home from './components/Home';
import UserPage from './components/UserPage';
import Admin from './components/Admin';
import RegisterOrEdit from './components/RegisterOrEdit';


function App() {

  const [customersData, setCustomersData] = useState([
    {
      id: 123456789,
      name: "Ofek Lamay",
      password: "Ofek123",
      balance: 10000,
      spendings: [{company: "Nike", amount: 100, id:1}],
      pageUrl: "Ofek-Lamay" 
    },
    {
      id: 123456788,
      name: "Ofek",
      password: "123456",
      balance: 12000,
      spendings: [{company: "Jordan", amount: 300, id:1}, {company: "Jordan", amount: 250, id:2}],
      pageUrl: "Ofek" 
    }
  ])

  const [customersToApprove, setCustomersToApprove] = useState([
    {
      id: 123456764,
      name: "Ofeki",
      password: "1234567",
      balance: 120300,
      spendings: [],
      pageUrl: "Ofeki" 
    }
  ])

  const checkUserCredentials = (username, password) => {

      let userIndex = -1

      for (let i = 0; i< customersData.length; i++)
      {
        if (customersData[i].name === username)
        {
          userIndex = i;
          i = customersData.length;
        }
      }

      if (userIndex === -1)
      {
        for (let i = 0; i< customersToApprove.length; i++)
        {
          if (customersToApprove[i].name === username)
          {
            alert("User was not approved by the admin yet");
            return false;
          }
        }
        alert("Wrong username");
        return false;
      }

      if (customersData[userIndex].password !== password)
      {
        alert("Wrong password");
        return false;
      }

      alert("Logged in");
      return true;
  }

  const doesUserExist = (id) => {
    for (let i = 0; i < customersData.length; i++)
      {
        if (customersData[i].id.toString() === id.toString())
        {
          return true;
        }
      }
      return false;
  }

  const deleteUser = (id) => {

    let allCustomers = [];
    for (let i = 0; i < customersData.length; i++)
      {
        if (customersData[i].id.toString() === id.toString())
        {
            continue;
        }
        allCustomers.push(customersData[i]);
      }

    setCustomersData([...allCustomers]);

  }

  const deleteSpending = (id, dealId) => {

    let allCustomers = customersData;
    let customerIndex = -1;
    for (let i = 0; i < customersData.length; i++)
      {
        if (customersData[i].id.toString() === id.toString())
        {
          customerIndex = i;
          i = customersData.length;
        }
      }

    let customerDeals = [];

    for (let i = 0; i < allCustomers[customerIndex].spendings.length; i++)
    {
      if (allCustomers[customerIndex].spendings[i].id.toString() !== dealId.toString())
        customerDeals.push(allCustomers[customerIndex].spendings[i]);
      
    }

    allCustomers[customerIndex] = {
      id: allCustomers[customerIndex].id,
      name: allCustomers[customerIndex].name,
      password: allCustomers[customerIndex].password,
      balance: allCustomers[customerIndex].balance,
      spendings: customerDeals,
      pageUrl: allCustomers[customerIndex].pageUrl
    }

    setCustomersData([...allCustomers]);

  }

  const performAction = (id, amount, reciever) => {

    let customerIndex = -1;
    let allCustomers = customersData;
    for (let i = 0; i < customersData.length; i++)
      {
        if (customersData[i].id.toString() === id.toString())
        {
          customerIndex = i;
          i = customersData.length;
        }
      }

    let newSpending = allCustomers[customerIndex].spendings;
    newSpending.push({company: reciever, amount: amount, id:allCustomers[customerIndex].spendings.length + 1});

    allCustomers[customerIndex] = {
      id: id,
      name: allCustomers[customerIndex].name,
      password: allCustomers[customerIndex].password,
      balance: allCustomers[customerIndex].balance - amount,
      spendings: newSpending,
      pageUrl: allCustomers[customerIndex].pageUrl 
    }

    setCustomersData([...allCustomers]);
    alert("Payed successfully");

  }

  const addNewCustomer = (id, name, password, balance) => {

    let newCustomer = {
      id: id,
      name: name,
      password: password,
      balance: balance,
      spendings: [],
      pageUrl: name.replace(" ", "-") 
    }

    setCustomersToApprove([...customersToApprove, newCustomer])

  }

  const removeUserToApprove = (id) => {
    let allCustomers = [];
    for (let i = 0; i < customersToApprove.length; i++)
      {
        if (customersToApprove[i].id.toString() === id.toString())
        {
            continue;
        }
        allCustomers.push(customersToApprove[i]);
      }

    setCustomersToApprove([...allCustomers]);
  }


  const addApprovedCustomer = (id, name, password, balance) => {

    let newCustomer = {
      id: id,
      name: name,
      password: password,
      balance: balance,
      spendings: [],
      pageUrl: name.replace(" ", "-") 
    }

    setCustomersData([...customersData, newCustomer])
    removeUserToApprove(id)
    
  }

  const editCustomer = (id, name, password) => {

    let customerIndex = -1;
    let allCustomers = customersData;
    for (let i = 0; i < customersData.length; i++)
      {
        if (customersData[i].id.toString() === id.toString())
        {
          customerIndex = i;
          i = customersData.length;
        }
      }
    
    if(customerIndex === -1)
    {
      alert("Users can't change their id");
      return;
    }

    allCustomers[customerIndex] = {
      id: id,
      name: name,
      password: password,
      balance: allCustomers[customerIndex].balance,
      spendings: allCustomers[customerIndex].spendings,
      pageUrl: allCustomers[customerIndex].pageUrl 
    }

    setCustomersData([...allCustomers]);

  }

  return (
    <div className="App">
  
      <Router>
        <Routes>
          <Route path={'/'} element={<Home checkCredentials={checkUserCredentials} />} />
          <Route path={'/register'} element={<RegisterOrEdit type={"Register"} addUser={addNewCustomer} isExist={doesUserExist} />} />
          <Route path={'/edit'} element={<RegisterOrEdit type={"Edit"} editUser={editCustomer} isExist={doesUserExist}/>} />
          <Route path={'/Admin'} element={<Admin noApprove = {removeUserToApprove} approveCustomer = {addApprovedCustomer} approveCustomers = {customersToApprove} allCustomers = {customersData} deleteUser={deleteUser} deleteDeal={deleteSpending}/>} />
          {customersData.map((customer) => {
            return <Route key={`/${customer.id}`} path={`/${customer.pageUrl}`} element={<UserPage user={customer} pay={performAction}/>} />
          })}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
