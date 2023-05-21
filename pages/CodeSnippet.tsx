export default function CodeSnippet({ method, url, bearerToken, body }: any) {
  const code = `
      const config = {
        method: '${method}',
        url: '${url}',
        headers: {
          Authorization: 'Bearer ${bearerToken}',
          'Content-Type': 'application/json',
        },
        data: ${body},
      };
  
      axios(config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    `;

  return (
    <div className="code-snippet">
      <h3>Code:</h3>
      <div className="bg-light">
        <code>
          {" "}
          <pre>{code}</pre>
        </code>
      </div>
    </div>
  );
}
