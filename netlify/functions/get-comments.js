exports.handler = async function(event) {
  try {
    const formName = event.queryStringParameters.form || "reflection-en";

    const response = await fetch("https://api.netlify.com/api/v1/forms", {
      headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Netlify API error: ${response.statusText}` })
      };
    }

    const forms = await response.json();
    const form = forms.find(f => f.name === formName);
    if (!form) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Form not found" })
      };
    }

    const submissionsResponse = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions`,
      {
        headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
      }
    );

    if (!submissionsResponse.ok) {
      return {
        statusCode: submissionsResponse.status,
        body: JSON.stringify({ error: `Netlify API error: ${submissionsResponse.statusText}` })
      };
    }

    const submissions = await submissionsResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(
        submissions.map(s => ({
          verse: s.data.verse || "",
          message: s.data.message || "",
          email: s.data.email || ""
        }))
      )
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
