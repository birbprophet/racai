const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyArS7q2uRBQ9zEx"
});
export const airtable = Airtable.base("appSvRWiM3mzOSnar");
