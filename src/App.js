import React, { useEffect, useState } from 'react';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import MainService from './services/MainService.services';

function App() {
  const [userTable, setUserTable] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    ssn: '',
  });

  useEffect(() => {
    getAccesToken();
    getTableDataApi();
  }, []);

  const getTableDataApi = async () => {
    let tableData = await MainService.getTableData();
    console.log({ tableData });

    setUserTable(tableData);
    console.log({ userTable });
  };

  const getAccesToken = async () => {
    let code = { username: 'sarah', password: 'connor' };
    let data = await MainService.postAuthentication(code);
    console.log(data.token);
    localStorage.setItem('token', data.token);
  };

  const renderTableData = () => {
    return (
      userTable.length > 0 &&
      userTable.map((student) => {
        return (
          <tr className='' key={student.id}>
            <td className=''>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.ssn}</td>
            <td>{student.address}</td>
          </tr>
        );
      })
    );
  };

  const renderTableHeader = () => {
    if (userTable.length > 0) {
      let header = Object.keys(userTable[0]);
      return header.map((key, index) => {
        return (
          <th className='p-5' key={index}>
            {key}
          </th>
        );
      });
    }
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };

  const validateValues = (name, value) => {
    let validation = false;
    if (name === 'ssn') {
      let formatSSN = /\d{3}-\d{2}-\d{4}/;
      if (value.match(formatSSN)) {
        return true;
      } else {
        setDisableSubmit(true);
        return false;
      }
    } else {
      if (value.length > 1) {
        setDisableSubmit(true);
        return true;
      } else {
        return false;
      }
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    let name = e.target.name;
    let value = e.target.value.trim();
    if (validateValues(name, value)) {
      setNewUser({ ...newUser, [name]: value });
    }

    console.log({ newUser });
  };

  return (
    <React.Fragment>
      <Header>Header</Header>
      <div className='flex m-5 '>
        <form onSubmit={() => handleSubmit()} className='flex flex-col w-1/3'>
          <input
            name='firstName'
            type='text'
            placeholder='First Name'
            onChange={handleChange}
          />
          <input
            name='lastName'
            type='text'
            placeholder='Last Name'
            onChange={handleChange}
          />
          <input
            name='address'
            type='text'
            placeholder='Address'
            onChange={handleChange}
          />
          <input
            name='ssn'
            type='text'
            placeholder='SSN'
            onChange={handleChange}
          />
          <div>
            <button type='reset'>Reset</button>
            <button type='submit' disabled={disableSubmit}>
              Save
            </button>
          </div>
        </form>
        <div>
          <table className='text-center '>
            <tr className=''>{renderTableHeader()}</tr>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </div>

      <Footer className=' bottom-0' />
    </React.Fragment>
  );
}

export default App;
