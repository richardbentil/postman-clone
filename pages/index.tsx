import React, { useState } from "react";
import axios from "axios";
import CodeSnippet from "./CodeSnippet";
import Form from "./Form";
import Nav from "./Nav";
import LoginButton from "./LoginButton";

function App() {
  const [tab, settab] = useState("request");
  const [url, setUrl] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [body, setBody] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [urlSuggestions, setUrlSuggestions] = useState([]);
  const [error, seterror] = useState(null);
  let host = "https://api.test.peswa.finance/api/v1/";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    seterror(null);
    setResponse(null);

    //save url in local storage
    if (url.trim() === "") return;
    const updatedUrls: any = [...urlSuggestions, url];

    setUrlSuggestions(updatedUrls);
    localStorage.setItem("savedUrls", JSON.stringify(updatedUrls));

    try {
      const config = {
        method,
        url: "https://api.test.peswa.finance/api/v1/" + url,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        data: body,
      };

      const { data, status }: any = await axios(config);
      setResponse(data);
      setStatusCode(status);
    } catch (error: any) {
      seterror(error);
      console.error(error);
      setResponse(null);
      setStatusCode(null);
    }
  };

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between">
        <h2>Postman Clone</h2>
        <LoginButton setBearerToken={setBearerToken} />
      </div>

      <p>
        I am aware that it works in postman, but it doenst work in the browser.
      </p>
      <Nav settab={settab} tab={tab} />
      <Form
        bearerToken={bearerToken}
        setBearerToken={setBearerToken}
        method={method}
        url={url}
        setUrl={setUrl}
        setMethod={setMethod}
        handleSubmit={handleSubmit}
        body={body}
        setBody={setBody}
        tab={tab}
        urlSuggestions={urlSuggestions}
        setUrlSuggestions={setUrlSuggestions}
        host={host}
      />
      <div className="response-section">
        {error && tab == "request" && !response && (
          <div className="response-data my-3">
            <h2>Error:</h2>
            {statusCode && <p>Status Code: {statusCode}</p>}
            {error && (
              <div
                className="border rounded-3 p-3 overflow-auto"
                style={{ height: 300 }}
              >
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
        {tab != "code" && tab == "request" && (
          <div className="response-data my-3">
            <h2>Response:</h2>
            {statusCode && <p>Status Code: {statusCode}</p>}
            {response && !error && (
              <div
                className="border rounded-3 p-3 overflow-auto"
                style={{ height: 300 }}
              >
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
        {tab == "code" && (
          <div className="code-section">
            <CodeSnippet
              method={method}
              url={url}
              bearerToken={bearerToken}
              body={JSON.stringify(body)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
