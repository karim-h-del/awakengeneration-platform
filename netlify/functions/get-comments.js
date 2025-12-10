// netlify/functions/get-comments.js

exports.handler = async function (event) {
  try {
    // Allow dynamic form name via query string, fallback to "reflection-en"
    const formName = event.queryStringParameters.form || "reflection-en";

    // Fetch all forms from Netlify API
    const response = await fetch("https://api.netlify.com/api/v1/forms", {
      headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Netlify API error: ${response.statusText}` })
      };
    }

    const forms = await response.json();
    const form = forms.find(f => f.name === formName);

    if (!form) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Form "${formName}" not found` })
      };
    }

    // Fetch submissions dynamically for the matched form
    const submissionsResponse = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions`,
      {
        headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
      }
    );

    if (!submissionsResponse.ok) {
      return {
        statusCode: submissionsResponse.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Netlify API error: ${submissionsResponse.statusText}` })
      };
    }

    const submissions = await submissionsResponse.json();

    // Return mapped submissions with dynamic fields
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        submissions.map(s => ({
          verse: s.data?.verse || "",
          message: s.data?.message || "",
          email: s.data?.email || ""
        }))
      )
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
