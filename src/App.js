import React, { useEffect, useState } from 'react';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import MainService from './services/MainService.services';

function App() {
  const [userTable, setUserTable] = useState([]);

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

  return (
    <React.Fragment>
      <Header>Header</Header>
      <div className='flex m-5 '>
        <form className='flex flex-col w-1/3'>
          <input type='text' placeholder='First Name' />
          <input type='text' placeholder='Last Name' />
          <input type='text' placeholder='Address' />
          <input type='text' placeholder='SSN' />
          <div>
            <button type='reset'>Reset</button>
            <button>Save</button>
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
