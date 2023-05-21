import React from "react";
import { MdCode } from "react-icons/md";

function Nav({ tab, settab }: any) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <ul className="nav nav-pills my-3">
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "request" && "active"}`}
            type="button"
            aria-current="page"
            onClick={() => settab("request")}
          >
            Request
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "authorization" && "active"}`}
            type="button"
            onClick={() => settab("authorization")}
          >
            Authorization
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "body" && "active"}`}
            type="button"
            onClick={() => settab("body")}
          >
            Body
          </a>
        </li>
      </ul>
      <a
        className="nav-link btn border p-2 ms-3"
        type="button"
        onClick={() => settab("code")}
      >
        <MdCode />
      </a>
    </div>
  );
}

export default Nav;
