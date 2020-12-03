/*=========== JOBS =============*/

export const FETCH_JOB_LOGS_BEGIN = 'FETCH_JOB_LOGS_BEGIN'
export const FETCH_JOB_LOGS_FAILURE = 'FETCH_JOB_LOGS_FAILURE'
export const FETCH_JOB_LOGS_SUCCESS = 'FETCH_JOB_LOGS_SUCCESS'
export const FETCH_JOBS_BEGIN = 'FETCH_JOBS_BEGIN'
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS'
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE'
export const JOBS_PAGE = 'JOBS'
export const MONITOR_TAB = 'monitor'
export const REMOVE_JOB_ERROR = 'REMOVE_JOB_ERROR'
export const REMOVE_NEW_JOB = 'REMOVE_NEW_JOB'
export const REMOVE_SCHEDULED_JOB_FAILURE = 'REMOVE_SCHEDULED_JOB_FAILURE'
export const RUN_NEW_JOB_FAILURE = 'RUN_NEW_JOB_FAILURE'
export const SCHEDULE_TAB = 'schedule'
export const SET_ALL_JOBS_DATA = 'SET_ALL_JOBS_DATA'
export const SET_NEW_JOB = 'SET_NEW_JOB'
export const SET_NEW_JOB_ENVIRONMENT_VARIABLES =
  'SET_NEW_JOB_ENVIRONMENT_VARIABLES'
export const SET_NEW_JOB_HYPER_PARAMETERS = 'SET_NEW_JOB_HYPER_PARAMETERS'
export const SET_NEW_JOB_INPUT_PATH = 'SET_NEW_JOB_INPUT_PATH'
export const SET_NEW_JOB_INPUTS = 'SET_NEW_JOB_INPUTS'
export const SET_NEW_JOB_OUTPUT_PATH = 'SET_NEW_JOB_OUTPUT_PATH'
export const SET_NEW_JOB_PARAMETERS = 'SET_NEW_JOB_PARAMETERS'
export const SET_NEW_JOB_RESOURCES_LIMITS = 'SET_NEW_JOB_RESOURCES_LIMITS'
export const SET_NEW_JOB_RESOURCES_REQUESTS = 'SET_NEW_JOB_RESOURCES_REQUESTS'
export const SET_NEW_JOB_SCHEDULE = 'SET_NEW_JOB_SCHEDULE'
export const SET_NEW_JOB_SECRET_SOURCES = 'SET_NEW_JOB_SECRET_SOURCES'
export const SET_NEW_JOB_VOLUME_MOUNTS = 'SET_NEW_JOB_VOLUME_MOUNTS'
export const SET_NEW_JOB_VOLUMES = 'SET_NEW_JOB_VOLUMES'
export const SET_URL = 'SET_URL'
export const SET_TUNING_STRATEGY = 'SET_TUNING_STRATEGY'

/*=========== ML FUNCTIONS =============*/

export const FETCH_FUNCTION_TEMPLATE_BEGIN = 'FETCH_FUNCTION_TEMPLATE_BEGIN'
export const FETCH_FUNCTION_TEMPLATE_FAILURE = 'FETCH_FUNCTION_TEMPLATE_FAILURE'
export const FETCH_FUNCTION_TEMPLATE_SUCCESS = 'FETCH_FUNCTION_TEMPLATE_SUCCESS'
export const FETCH_FUNCTIONS_BEGIN = 'FETCH_FUNCTIONS_BEGIN'
export const FETCH_FUNCTIONS_FAILURE = 'FETCH_FUNCTIONS_FAILURE'
export const FETCH_FUNCTIONS_SUCCESS = 'FETCH_FUNCTIONS_SUCCESS'
export const FUNCTIONS_PAGE = 'FUNCTIONS'
export const REMOVE_FUNCTION_TEMPLATE = 'REMOVE_FUNCTION_TEMPLATE'
export const SET_FUNCTIONS_TEMPLATES = 'SET_FUNCTIONS_TEMPLATES'

/*=========== ARTIFACTS =============*/

export const ARTIFACTS_FEATURE_STORE = 'feature-store'
export const ARTIFACTS_FILES_PAGE = 'files'
export const ARTIFACTS_DATASETS_PAGE = 'datasets'
export const ARTIFACTS_MODELS_PAGE = 'models'
export const ARTIFACTS_PAGE = 'ARTIFACTS'
export const CLOSE_ARTIFACT_PREVIEW = 'CLOSE_ARTIFACT_PREVIEW'
export const FETCH_ARTIFACT_PREVIEW_BEGIN = 'FETCH_ARTIFACT_PREVIEW_BEGIN'
export const FETCH_ARTIFACT_PREVIEW_FAILURE = 'FETCH_ARTIFACT_PREVIEW_FAILURE'
export const FETCH_ARTIFACT_PREVIEW_SUCCESS = 'FETCH_ARTIFACT_PREVIEW_SUCCESS'
export const FETCH_ARTIFACTS_BEGIN = 'FETCH_ARTIFACTS_BEGIN'
export const FETCH_ARTIFACTS_FAILURE = 'FETCH_ARTIFACTS_FAILURE'
export const FETCH_ARTIFACTS_SUCCESS = 'FETCH_ARTIFACTS_SUCCESS'
export const FETCH_DATASETS_BEGIN = 'FETCH_DATASETS_BEGIN'
export const FETCH_DATASETS_FAILURE = 'FETCH_DATASETS_FAILURE'
export const FETCH_DATASETS_SUCCESS = 'FETCH_DATASETS_SUCCESS'
export const FETCH_FILES_BEGIN = 'FETCH_FILES_BEGIN'
export const FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE'
export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS'
export const FETCH_MODELS_BEGIN = 'FETCH_MODELS_BEGIN'
export const FETCH_MODELS_FAILURE = 'FETCH_MODELS_FAILURE'
export const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS'
export const REMOVE_ARTIFACTS = 'REMOVE_ARTIFACTS'
export const REMOVE_DATASETS = 'REMOVE_DATASETS'
export const REMOVE_FILES = 'REMOVE_FILES'
export const REMOVE_MODELS = 'REMOVE_MODELS'
export const SET_ARTIFACT_FILTER = 'SET_ARTIFACT_FILTER'
export const SHOW_ARTIFACT_PREVIEW = 'SHOW_ARTIFACT_PREVIEW'

/*=========== PROJECTS =============*/

export const CREATE_PROJECT_BEGIN = 'CREATE_PROJECT_BEGIN'
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE'
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
export const DELETE_PROJECT_BEGIN = 'DELETE_PROJECT_BEGIN'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const FETCH_PROJECT_BEGIN = 'FETCH_PROJECT_BEGIN'
export const FETCH_PROJECT_DATASETS_BEGIN = 'FETCH_PROJECT_DATASETS_BEGIN'
export const FETCH_PROJECT_DATASETS_FAILURE = 'FETCH_PROJECT_DATASETS_FAILURE'
export const FETCH_PROJECT_DATASETS_SUCCESS = 'FETCH_PROJECT_DATASETS_SUCCESS'
export const FETCH_PROJECT_FAILED_JOBS_BEGIN = 'FETCH_PROJECT_FAILED_JOBS_BEGIN'
export const FETCH_PROJECT_FAILED_JOBS_FAILURE =
  'FETCH_PROJECT_FAILED_JOBS_FAILURE'
export const FETCH_PROJECT_FAILED_JOBS_SUCCESS =
  'FETCH_PROJECT_FAILED_JOBS_SUCCESS'
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE'
export const FETCH_PROJECT_FILES_BEGIN = 'FETCH_PROJECT_FILES_BEGIN'
export const FETCH_PROJECT_FILES_FAILURE = 'FETCH_PROJECT_FILES_FAILURE'
export const FETCH_PROJECT_FILES_SUCCESS = 'FETCH_PROJECT_FILES_SUCCESS'
export const FETCH_PROJECT_FUNCTIONS_BEGIN = 'FETCH_PROJECT_FUNCTIONS_BEGIN'
export const FETCH_PROJECT_FUNCTIONS_FAILURE = 'FETCH_PROJECT_FUNCTIONS_FAILURE'
export const FETCH_PROJECT_FUNCTIONS_SUCCESS = 'FETCH_PROJECT_FUNCTIONS_SUCCESS'
export const FETCH_PROJECT_JOBS_BEGIN = 'FETCH_PROJECT_JOBS_BEGIN'
export const FETCH_PROJECT_JOBS_FAILURE = 'FETCH_PROJECT_JOBS_FAILURE'
export const FETCH_PROJECT_JOBS_SUCCESS = 'FETCH_PROJECT_JOBS_SUCCESS'
export const FETCH_PROJECT_MODELS_BEGIN = 'FETCH_PROJECT_MODELS_BEGIN'
export const FETCH_PROJECT_MODELS_FAILURE = 'FETCH_PROJECT_MODELS_FAILURE'
export const FETCH_PROJECT_MODELS_SUCCESS = 'FETCH_PROJECT_MODELS_SUCCESS'
export const FETCH_PROJECT_RUNNING_JOBS_BEGIN =
  'FETCH_PROJECT_RUNNING_JOBS_BEGIN'
export const FETCH_PROJECT_RUNNING_JOBS_FAILURE =
  'FETCH_PROJECT_RUNNING_JOBS_FAILURE'
export const FETCH_PROJECT_RUNNING_JOBS_SUCCESS =
  'FETCH_PROJECT_RUNNING_JOBS_SUCCESS'
export const FETCH_PROJECT_SCHEDULED_JOBS_BEGIN =
  'FETCH_PROJECT_SCHEDULED_JOBS_BEGIN'
export const FETCH_PROJECT_SCHEDULED_JOBS_FAILURE =
  'FETCH_PROJECT_SCHEDULED_JOBS_FAILURE'
export const FETCH_PROJECT_SCHEDULED_JOBS_SUCCESS =
  'FETCH_PROJECT_SCHEDULED_JOBS_SUCCESS'
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS'
export const FETCH_PROJECTS_BEGIN = 'FETCH_PROJECTS_BEGIN'
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const FETCH_PROJECT_WORKFLOWS_BEGIN = 'FETCH_PROJECT_WORKFLOWS_BEGIN'
export const FETCH_PROJECT_WORKFLOWS_FAILURE = 'FETCH_PROJECT_WORKFLOWS_FAILURE'
export const FETCH_PROJECT_WORKFLOWS_SUCCESS = 'FETCH_PROJECT_WORKFLOWS_SUCCESS'
export const PROJECTS_PAGE = 'PROJECTS'
export const REMOVE_JOB_LOGS = 'REMOVE_JOB_LOGS'
export const REMOVE_NEW_PROJECT = 'REMOVE_NEW_PROJECT'
export const REMOVE_NEW_PROJECT_ERROR = 'REMOVE_NEW_PROJECT_ERROR'
export const REMOVE_PROJECT_DATA = 'REMOVE_PROJECT_DATA'
export const SET_JOBS_AND_WORKFLOWS = 'SET_JOBS_AND_WORKFLOWS'
export const SET_NEW_PROJECT_DESCRIPTION = 'SET_NEW_PROJECT_DESCRIPTION'
export const SET_NEW_PROJECT_NAME = 'SET_NEW_PROJECT_NAME'

/*=========== GENERAL =============*/

export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const SET_LOADING = 'SET_LOADING'

export const FETCH_WORKFLOWS_BEGIN = 'FETCH_WORKFLOWS_BEGIN'
export const FETCH_WORKFLOWS_SUCCESS = 'FETCH_WORKFLOWS_SUCCESS'
export const FETCH_WORKFLOWS_FAILURE = 'FETCH_WORKFLOWS_FAILURE'

/*=========== DETAILS =============*/

export const DETAILS_ANALYSIS_TAB = 'ANALYSIS'
export const DETAILS_ARTIFACTS_TAB = 'ARTIFACTS'
export const DETAILS_CODE_TAB = 'CODE'
export const DETAILS_INFO_TAB = 'INFO'
export const DETAILS_INPUTS_TAB = 'INPUTS'
export const DETAILS_LOGS_TAB = 'LOGS'
export const DETAILS_METADATA_TAB = 'METADATA'
export const DETAILS_PREVIEW_TAB = 'PREVIEW'
export const DETAILS_RESULTS_TAB = 'RESULTS'

/*=========== NUCLIO =============*/

export const FETCH_API_GATEWAYS_BEGIN = 'FETCH_API_GATEWAYS_BEGIN'
export const FETCH_API_GATEWAYS_FAILURE = 'FETCH_API_GATEWAYS_FAILURE'
export const FETCH_API_GATEWAYS_SUCCESS = 'FETCH_API_GATEWAYS_SUCCESS'
export const FETCH_NUCLIO_FUNCTIONS_BEGIN = 'FETCH_NUCLIO_FUNCTIONS_BEGIN'
export const FETCH_NUCLIO_FUNCTIONS_FAILURE = 'FETCH_NUCLIO_FUNCTIONS_FAILURE'
export const FETCH_NUCLIO_FUNCTIONS_SUCCESS = 'FETCH_NUCLIO_FUNCTIONS_SUCCESS'
