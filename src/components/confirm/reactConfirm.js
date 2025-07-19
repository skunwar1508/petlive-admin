import React from 'react';
import PropTypes from 'prop-types';
import { confirm } from "react-confirm-box";
import common from '../../services/common';
import authAxios from '../../services/authAxios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
/**
 * ReactConfirm Component
 *
 * Handles different types of confirmations, including delete, switch, dropdown, and custom.
 *
 * @param {object} props
 * @param {string} props.type - Type of confirmation (delete, switch, dropdown, custom)
 * @param {boolean} props.value - Value of the switch
 * @param {string} props.route - URL route for the request
 * @param {string} props.name - Name of the button or label
 * @param {function} props.action - Action to perform after confirmation
 * @param {string} props.method - HTTP method for the request (DELETE, POST)
 * @param {object} props.payload - Data to send with the request
 * @param {string} props.message - Confirm message to display
 * @param {array} props.options - Options for the dropdown
 * 
 */
/**
 * CustomToast Component
 *
 * Displays a toast with a textarea for input and a submit button.
 *
 * @param {function} closeToast - Function to close the toast
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
  reasonAllow,
}) => {
  const handleRequest = async (type, value) => {
    const confirmMessage = type === 'delete'
      ? 'Are you sure you want to delete this item?'
      : 'Are you sure you want to change the status?';
    const postData = type === 'dropdown' ? { status: value } : payload;
    let result;
    if (reasonAllow) {
      result = await new Promise((resolve) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            let reason = '';
            const handleReasonChange = (e) => {
              reason = e.target.value;
            };

            return (
              <div className="custom-ui" style={{width:'280px'}}>
                <h4 className="mb-3 text-center">Provide a reason</h4>
                <textarea
                  className="form-control mb-3"
                  placeholder="Enter reason here..."
                  onChange={handleReasonChange}
                  style={{ width: '100%', height: '100px' }}
                />
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-secondary me-2" onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-theme"
                    onClick={() => {
                      onClose();
                      resolve(reason);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            );
          },
        });
      });
      console.log(result)
      if (!result) {
        return;
      }

      postData.reason = result;
    } else {
      result = await confirm(confirmMessage || message);
    }
    console.log(result)
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

  const handleCustomConfirm = async (customMessage, customAction) => {
    const result = await confirm(customMessage);
    if (result) {
      common.loader(true);
      authAxios({
        method: method || 'POST',
        url: route,
        data: payload || {},
      })
        .then((res) => {
          toast.success(res?.data?.message);
          customAction(res);
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
          className="btn-text btn-shadow btn btn-danger"
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
            checked={value === true}
          />
          <span className="custom-control-label"></span>
        </label>
      )}
      {type === 'dropdown' && (
        <select
          value={value}
          className="table-select"
          onChange={(e) => handleRequest('dropdown', e?.target?.value)}
        >
          {options?.map((option, index) => (
            <option key={index} value={option?.value} disabled={option?.value === "pending"}>
              {option?.label}
            </option>
          ))}
        </select>
      )}
      {type === 'custom' && (
        <button
          onClick={() => handleCustomConfirm(message || 'Are you sure?', action)}
          className="btn btn-primary"
        >
          {name || 'Confirm'}
        </button>
      )}
    </>
  );
};

ReactConfirm.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  route: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.func.isRequired,
  method: PropTypes.string,
  payload: PropTypes.object,
  message: PropTypes.string,
  options: PropTypes.array,
};

export default ReactConfirm;