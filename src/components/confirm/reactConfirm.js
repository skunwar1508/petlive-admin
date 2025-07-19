import React from 'react';
import PropTypes from 'prop-types';
import { confirm } from "react-confirm-box";
import common from '../../services/common';
import authAxios from '../../services/authAxios';
import { toast } from 'react-toastify';

/**
 * ReactConfirm Component
 *
 * Handles different types of confirmations, including delete, switch, and dropdown.
 *
 * @param {object} props
 * @param {string} props.type - Type of confirmation (delete, switch, dropdown)
 * @param {boolean} props.value - Value of the switch
 * @param {string} props.route - URL route for the request
 * @param {string} props.name - Name of the button or label
 * @param {function} props.action - Action to perform after confirmation
 * @param {string} props.method - HTTP method for the request (DELETE, POST)
 * @param {object} props.payload - Data to send with the request
 * @param {string} props.message - Confirm message to display
 * @param {array} props.options - Options for the dropdown
 */
const ReactConfirm = ({
  type,
  value,
  route,
  name,
  action,
  method,
  payload,
  message,
  options,
}) => {
  const handleRequest = async (type, value) => {
    const confirmMessage = type === 'delete'
      ? 'Are you sure you want to delete this item?'
      : 'Are you sure you want to change the status?';
    const postData = type == 'dropdown' ? { status: value } : payload;
    const result = await confirm(confirmMessage || message);
    if (result) {
      common.loader(true);
      authAxios({
        method: method || (type === 'delete' ? 'DELETE' : 'POST'),
        url: route,
        data: postData || {},
      })
        .then((res) => {
          toast.success(res?.data?.message);
          action(res);
        })
        .catch((error) => {
          toast.error('Error: ' + error.message);
          console.log(error);
        })
        .finally(() => {
          common.loader(false);
        });
    }
  };

  return (
    <>
      {type === 'delete' && (
        <a
          onClick={() => handleRequest('delete')}
          className="btn-text  btn-shadow btn btn-danger"
        >
          <span className="btn-text">{name || 'Delete'}</span>
        </a>
      )}
      {type === 'switch' && (
        <label className="custom-control custom-switch switch-sm">
          <input
            type="checkbox"
            className="custom-control-input"
            onChange={(e) => handleRequest('switch', e?.target?.checked)}
            checked={value == true}
          />
          <span className="custom-control-label"></span>
        </label>
      )}
      {type === 'dropdown' && (
        <select value={value} className="table-select" onChange={(e) => handleRequest('dropdown', e?.target?.value)}>
          {/* <option value="">Select</option> */}
          {options?.map((option, index) => (
            <option key={index} value={option?.value} disabled={option?.value == "pending"}>
              {option?.label}
            </option>
          ))}
        </select>
      )}
      {/* <ReactConfirm
        type="delete"
        route="/api/delete"
        name="Delete"
        action={handleDelete}
        method="DELETE"
        payload={{ id: 1 }}
      />
      <ReactConfirm
        type="switch"
        value={true}
        route="/api/switch"
        action={handleSwitch}
        method="POST"
        payload={{ id: 1 }}
      />
      <ReactConfirm
        type="dropdown"
        route="/api/options"
        options={[
          { value: '1', name: 'Option 1' },
          { value: '2', name: 'Option 2' },
        ]}
        action={(res) => console.log('Selected:', res)}
      /> */}
    </>
  );
};

ReactConfirm.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  route: PropTypes.string.isRequired,
  name: PropTypes.string,
  action: PropTypes.func.isRequired,
  method: PropTypes.string,
  payload: PropTypes.object,
  message: PropTypes.string,
  options: PropTypes.array,
};

export default ReactConfirm;