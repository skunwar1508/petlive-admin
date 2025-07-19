import { convert } from "html-to-text";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import common from "../../services/common";

const ViewMore = ({ data }) => {
  const [show, setShow] = useState(false);

  const text = convert(data, {
    wordwrap: 130,
  });
  return (
    <>
      <span className={`contentView ${data?.length > 100 && "showmore"}`}>
        <div dangerouslySetInnerHTML={{ __html: common.trim(text) }} />
      </span>
      {data?.length > 100 && (
        <>
          <a className="anchor" onClick={() => setShow(true)}>
            View More{" "}
          </a>
          <Modal show={show} onHide={() => setShow(false)} animation={false}>
            <div className="Mobile_menuClose closeModal">
              <i
                className="fa-solid fa-xmark"
                onClick={() => setShow(false)}
              ></i>
            </div>
            <div className="constentBoxwr">
              <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ViewMore;
