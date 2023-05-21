import axios from "axios";
import React from "react";

function LoginButton({ setBearerToken }: any) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = new URLSearchParams({
        grant_type: "password",
        username: "express-tset",
        password: "dA4KQHgzyeOGGnz",
        client_id: "nls",
      }).toString();

      const config = {
        method: "POST",
        url: "https://authtest.peswa.finance/auth/realms/Peswa/protocol/openid-connect/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: payload,
      };

      const { data, status }: any = await axios(config);
      setBearerToken(data?.access_token);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <button className="btn btn-primary" onClick={handleSubmit}>
      Login
    </button>
  );
}

export default LoginButton;
