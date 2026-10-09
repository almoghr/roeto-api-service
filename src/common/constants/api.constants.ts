export const API_CONSTANTS = {
  DEFAULT_PORT: 3003,
  GLOBAL_PREFIX: 'api/v1',
  DEFAULT_BASE_URL: 'https://api.roeto.co.il/api/v1',
  AUTH_HEADER_PREFIX: 'Bearer ',
  BASIC_HEADER_PREFIX: 'Basic ',
  HEADER_CONTENT_TYPE: 'Content-Type',
  HEADER_AUTHORIZATION: 'Authorization',
  CONTENT_TYPE_JSON: 'application/json',
  CONTENT_TYPE_FORM: 'application/x-www-form-urlencoded',
  CONTENT_TYPE_MULTIPART: 'multipart/form-data',
  DEFAULT_TIMEOUT_MS: 30000,
  DEFAULT_MAX_RETRIES: 2,
  RETRY_INITIAL_DELAY_MS: 500,
} as const;

export const ROETO_ENDPOINTS = {
  // Authentication
  OAUTH_TOKEN: '/oauth/token',
  OAUTH_CHECK_TOKEN: '/oauth/check-token',

  // Agency
  AGENCY_AGENTS_LIST: '/agency/agents-list',
  AGENCY_USERS_LIST: '/agency/users-list',
  AGENCY_CLIENT_TYPES: '/agency/client-types',
  AGENCY_CLIENTS_BY_AGENT: (meshavekItemId: string) => `/agency/clients-by-agent/${meshavekItemId}`,
  AGENCY_CHECK_CLIENT_EXISTANCE: '/agency/check-client-existance',

  // Agent
  AGENT_DASHBOARD: '/agent/dashboard',

  // Clients
  CLIENTS_BIRTHDAYS: '/clients/birthdays',
  CLIENTS_SEARCH: '/clients/search',
  CLIENTS_PORTFOLIO: (userID: string) => `/clients/portfolio/${userID}`,
  CLIENTS_NOTES: (userID: string) => `/clients/${userID}/notes`,
  CLIENTS_TROM_PORTFOLIO: (userID: string) => `/clients/tromYeutz/portfolio/${userID}`,
  CLIENTS_CHECK_MISLAKA_PREREQUISITES: (userID: string, accountId: string) =>
    `/clients/${userID}/check-mislaka-prerequisites/${accountId}`,
  CLIENTS_CREATE_MISLAKA_REQUEST: (userID: string, accountId: string) =>
    `/clients/${userID}/create-mislaka-request/${accountId}`,
  CLIENTS_LATEST_MISLAKA_FILES: (userID: string) => `/clients/${userID}/latest-mislaka-request-files`,
  CLIENTS_CREATE_MISLAKA_B1: (userID: string, accountId: string) =>
    `/clients/${userID}/create-mislaka-b1-request/${accountId}`,
  CLIENTS_CREATE_TROM: '/clients/create-trom-yeutz-client',
  CLIENTS_CREATE_ACTIVE: '/clients/create-active-client',
  CLIENTS_CONVERT_TROM_TO_ACTIVE: (userID: string) => `/clients/convert-trom-to-active/${userID}`,
  CLIENTS_ASSIGN_AGENT: '/clients/assign-agent',
  CLIENTS_GOREM_METAPEL: (userID: string) => `/clients/${userID}/goremMetapel`,
  CLIENTS_UPDATE_DETAILS: (userID: string) => `/clients/${userID}/update-details`,
  CLIENTS_CHANGE_CLIENT_TYPE: (userID: string) => `/clients/${userID}/change-active-client-type`,
  CLIENTS_UPDATE_TROM_DETAILS: (userID: string) => `/clients/${userID}/update-trom-yeutz-details`,
  CLIENTS_SET_ID_ISSUE_DATE: (userID: string) => `/clients/${userID}/set-id-issue-date`,
  CLIENTS_ASSIGN_EMPLOYER: '/clients/assign-employer',
  CLIENTS_BY_EMPLOYER: (employerId: string) => `/clients/by-employer/${employerId}`,
  CLIENTS_UPLOAD_FILE_TROM: (userID: string) => `/clients/${userID}/upload-file-tromYeutz-client`,
  CLIENTS_UPLOAD_FILE_ACTIVE: (userID: string) => `/clients/${userID}/upload-file-active-client`,

  // Mislaka
  MISLAKA_CONNECTION: '/mislaka/connection',
  MISLAKA_COMPANIES_LIST: '/mislaka/companies-list',

  // Roeto-Pol
  ROETO_POL_ACCOUNTS: '/roeto-pol/accounts',
  ROETO_POL_FORM_SIGNATURE: (userID: string) => `/roeto-pol/form-signature/${userID}`,
  ROETO_POL_HAR_BITUACH: (userID: string) => `/roeto-pol/har-bituach/${userID}`,

  // Cellosign
  CELLOSIGN_FORM_SIGNATURE: '/cellosign/form-signature',
  CELLOSIGN_SESSION_EXPIRED: '/cellosign/session-expired',

  // Employers
  EMPLOYERS: '/employers',

  // Leads
  LEADS_CAMPAIGNS: '/leads/campaigns',
  LEADS_CREATE: '/leads/lead',
  LEADS_UPDATE: (leadId: string) => `/leads/lead/${leadId}`,
  LEADS_SEARCH: '/leads/leads/search',
  LEADS_IMPORT: '/leads/import',

  // Sales Management / Financial Activities
  FINANCIAL_ACTIVITIES_RESOURCES: '/financialActivities/resources',
  FINANCIAL_ACTIVITIES_SEARCH: '/financialActivities/search',
  FINANCIAL_ACTIVITIES_FETCH: '/financialActivities/fetch',
  FINANCIAL_ACTIVITIES_UPDATE: (faId: string) => `/financialActivities/update/${faId}`,
  FINANCIAL_ACTIVITIES_CREATE: (userID: string) => `/financialActivities/new/${userID}`,
  FINANCIAL_ACTIVITIES_CHANGE_STATUS: (faId: string) => `/financialActivities/change-status/${faId}`,
  FINANCIAL_ACTIVITIES_LINK_WITH_TASK: (faId: string, taskId: string) =>
    `/financialActivities/link-with-task/${faId}/${taskId}`,

  // Tasks
  TASKS: '/tasks',
  TASKS_RESOURCES: '/tasks/resources',
  TASKS_TOGGLE_COMPLETE: (taskId: string) => `/tasks/${taskId}/toggle-complete`,
  TASKS_DESCRIPTION: (taskId: string) => `/tasks/${taskId}/description`,
  TASKS_ACTION: (taskId: string) => `/tasks/${taskId}/action`,
  TASKS_DUE_DATE: (taskId: string) => `/tasks/${taskId}/due-date`,
  TASKS_TOGGLE_REMINDER: (taskId: string) => `/tasks/${taskId}/toggle-reminder`,
  TASKS_BY_USER: (userId: string) => `/tasks/by-user/${userId}`,
  TASKS_REASSIGN: (userId: string) => `/tasks/reassign-tasks/${userId}`,
} as const;
