const saml = require("samlify");
const express = require("express");
const fs = require("fs");

const app = express();

// configure a service provider
const sp = saml.ServiceProvider({
  metadata: fs.readFileSync("./metadata_sp.xml"),
});
// configure the corresponding identity provider
const idp = saml.IdentityProvider({
  metadata: fs.readFileSync("./metadata_idp.xml"),
});
// parse when receive a SAML Response from IdP
app.post("/acs", (req, res) => {
  sp.parseLoginResponse(idp, "post", req)
    .then((parseResult) => {
      // Write your own validation and render function here
    })
    .catch(console.error);
});

app.get("/spinitsso-redirect", (req, res) => {
  sp.entitySetting.relayState = "http://example.com";
  const { id, context } = sp.createLoginRequest(idp, "redirect");
  console.log(context);
  return res.redirect(context);
});

app.listen(5000, () => {
  console.log("server sarted on localhost:4000");
});
