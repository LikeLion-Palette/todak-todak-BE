const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: "todak-todak",
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_PRIVATE_KEY,
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: process.env.ADMIN_AUTH_URI,
  token_uri: process.env.ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_CLIENT_X509_CERT_URL,
};

// private_key_id: functions.config().admin.key.id,
// private_key: functions.config().admin.key.key,
// client_email: functions.config().admin.client.email,
// client_id: functions.config().admin.client.id,
// auth_uri: functions.config().admin.authuri,
// token_uri: functions.config().admin.tokenuri,
// auth_provider_x509_cert_url: functions.config().admin.authprovider,
// client_x509_cert_url: functions.config().admin.clientcerturl,

exports.serviceAccount = serviceAccount;
