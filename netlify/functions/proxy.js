exports.handler = async function(event) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({error:{message:"No API key found in environment"}})
      };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: event.body
    });

    const text = await response.text();

    if (!text) {
      return {
        statusCode: 500,
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({error:{message:"Empty response from Anthropic API"}})
      };
    }

    return {
      statusCode: response.status,
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: text
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({error:{message:e.message}})
    };
  }
};
