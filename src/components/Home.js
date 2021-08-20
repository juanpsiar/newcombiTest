import React, { useEffect, useState } from 'react';

import MainService from '../services/MainService.services';

export default function Home() {
  const [userTable, setUserTable] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    ssn: '',
  });
  const [msgError, setMsgError] = useState({
    firstName: '',
    lastName: '',
    address: '',
    ssn: '',
  });

  const formatSSN = /\d{3}-\d{2}-\d{4}/;
  let dataTable = [];

  useEffect(() => {
    getAccesToken();
    getTableDataApi();
  }, []);

  useEffect(() => {
    if (Object.values(msgError).join(' ').trim().length > 0) {
      console.log({ msgError });
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [msgError]);

  const getAccesToken = async () => {
    let data = await MainService.postAuthentication();
    console.log(data.token);
    localStorage.setItem('token', data.token);
  };

  const getTableDataApi = async () => {
    let tableData = await MainService.getTableData();
    console.log({ tableData });

    setUserTable(tableData);
    console.log({ userTable });
  };

  const renderTableData = () => {
    return (
      userTable.length > 0 &&
      userTable.map((user, index) => {
        return (
          <tr className='' key={index}>
            <td className=''>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.ssn}</td>
            <td>{user.address}</td>
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await MainService.createUser(newUser);
    console.log(data);
    setUserTable([...userTable, newUser]);
    setMsgError({ firstName: '', lastName: '', address: '', ssn: '' });
  };

  const ssnValidate = (checkValue, checkName) => {
    let uniqueSSN = [];
    uniqueSSN = userTable.find((elemt) => elemt.ssn === checkValue);
    console.log({ uniqueSSN });
    if (uniqueSSN && !uniqueSSN.length > 0) {
      setMsgError({
        ...msgError,
        [checkName]: `Repeated ${checkName} `,
      });
      return false;
    } else {
      setMsgError({
        ...msgError,
        [checkName]: '',
      });
      return true;
    }
  };

  const validateValues = (name, value) => {
    if (name === 'ssn') {
      if (value.match(formatSSN)) {
        console.log('coincide');
        setMsgError({ ...msgError, [name]: `` });
        return ssnValidate(value, name);
      } else {
        setMsgError({ ...msgError, [name]: `${name} format is invalid` });
        return false;
      }
    } else {
      if (value.length > 1) {
        setMsgError({ ...msgError, [name]: '' });
        return true;
      } else {
        setMsgError({ ...msgError, [name]: `${name} length is invalid` });
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
  };

  const cleanValues = () => {
    setNewUser({ firstName: '', lastName: '', address: '', ssn: '' });
    setMsgError({
      firstName: '',
      lastName: '',
      address: '',
      ssn: '',
    });
  };

  return (
    <React.Fragment>
      <div className='flex m-5 '>
        <form
          //          onSubmit={() => handleSubmit()}
          className='flex flex-col w-1/3 items-center   '
        >
          <React.Fragment>
            <input
              className='border rounded-md border-gray-300 w-1/2  m-2'
              name='firstName'
              type='text'
              placeholder='First Name'
              onChange={handleChange}
            />
            {msgError.firstName.length > 0 && (
              <label className='text-red-400'>{msgError.firstName}</label>
            )}
          </React.Fragment>
          <React.Fragment>
            <input
              className='border rounded-md border-gray-300 w-1/2 m-2'
              name='lastName'
              type='text'
              placeholder='Last Name'
              onChange={handleChange}
            />{' '}
            {msgError.lastName.length > 0 && (
              <label className='text-red-400'>{msgError.lastName}</label>
            )}
          </React.Fragment>
          <React.Fragment>
            <input
              className='border rounded-md border-gray-300 w-1/2 m-2'
              name='address'
              type='text'
              placeholder='Address'
              onChange={handleChange}
            />{' '}
            {msgError.address.length > 0 && (
              <label className='text-red-400'>{msgError.address}</label>
            )}
          </React.Fragment>
          <React.Fragment>
            <input
              className='border rounded-md border-gray-300 w-1/2 m-2'
              name='ssn'
              type='text'
              placeholder='SSN'
              onChange={handleChange}
            />{' '}
            {msgError.ssn.length > 0 && (
              <label className='text-red-400'>{msgError.ssn}</label>
            )}
          </React.Fragment>
          <div className='w-full flex justify-center text-white'>
            <button
              className='border rounded-lg bg-gray-500 w-1/3'
              type='reset'
              onClick={cleanValues}
            >
              Reset
            </button>
            <button
              className='border rounded-lg bg-gray-500 w-1/3 disabled:opacity-50'
              type='submit'
              onClick={handleSubmit}
              disabled={disableSubmit}
            >
              Save
            </button>
          </div>
        </form>
        <div className='w-2/3'>
          <table className='text-center w-full'>
            <tbody>
              <tr className=''>{renderTableHeader()}</tr>
              {renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
