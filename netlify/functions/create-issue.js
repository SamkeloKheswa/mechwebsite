const fetch = require('node-fetch');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const issueTitle = `[${data.category}] ${data.name} - ${data.email}`;
  const issueBody = `
**Name:** ${data.name}
**Email:** ${data.email}
**Issue Type:** ${data.category}

**Description:**  
${data.description}
`;

  const response = await fetch('https://api.github.com/repos/SamkeloKheswa/mechwebsite/issues', {
    method: 'POST',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody
    }),
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Issue created successfully.' })
    };
  } else {
    const errorText = await response.text();
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: errorText })
    };
  }
};
