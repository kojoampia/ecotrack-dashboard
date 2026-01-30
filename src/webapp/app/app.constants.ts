// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
export const MOCK_MODE_ENABLED = Boolean(process.env.MOCK_MODE_ENABLED);
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const ECO_DASHBOARD_URL = process.env.ECO_DASHBOARD_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const PROFILE_USER_URL = '/content/images/profile-user.svg';
export const CUSTOMER_TEST_API = 'https://api-eco-customer.jojoaddison.net';
export const ADMIN_TEST_API = 'https://api-eco-admin.jojoaddison.net';
export const CUSTOMER_API = 'https://customer.jojoaddison.net';
export const ADMIN_API = 'https://admin.jojoaddison.net';
