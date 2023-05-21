import React, { useEffect } from "react";

import { JsonInput } from "@mantine/core";
import Token from "./Token";

function Form({
  bearerToken,
  setBearerToken,
  method,
  url,
  setUrl,
  setMethod,
  handleSubmit,
  body,
  setBody,
  tab,
  urlSuggestions,
  setUrlSuggestions,
  host
}: any) {
  useEffect(() => {
    const savedUrls = localStorage.getItem("savedUrls");
    if (savedUrls) {
      setUrlSuggestions(JSON.parse(savedUrls));
    }
  }, [setUrlSuggestions]);

  const handleUrlInputFocus = () => {
    const savedUrls = localStorage.getItem("savedUrls");
    if (savedUrls) {
      setUrlSuggestions(JSON.parse(savedUrls));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {tab == "request" && (
        <div className="row">
          <div className="form-group col-2">
            <label>Method:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="form-select"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="form-group col-8">
            <label>URL:</label>
           <span className="small text-muted"> {host}</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control"
              onFocus={handleUrlInputFocus}
              list="urlSuggestions"
            />
            <datalist id="urlSuggestions">
              {urlSuggestions.map((urlSuggestion: any, index: number) => (
                <option key={index} value={urlSuggestion} />
              ))}
            </datalist>
          </div>

          <div className="col-2 mt-4 text-end">
            <button type="submit" className="btn btn-primary" disabled={!bearerToken}>
              Send Request
            </button>
          </div>
        </div>
      )}

      {tab == "authorization" && (
       <Token bearerToken={bearerToken} setBearerToken={setBearerToken} />
      )}
      {tab == "body" && (
        <div className="form-group">
          <label>Body:</label>
          <JsonInput
            label="Request body"
            placeholder="Textarea will autosize to fit the content"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            value={body}
            onChange={setBody}
          />
        </div>
      )}
    </form>
  );
}

export default Form;
