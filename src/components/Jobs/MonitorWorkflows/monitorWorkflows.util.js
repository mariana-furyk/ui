import React from 'react'

import {
  DATE_RANGE_TIME_FILTER,
  JOBS_PAGE,
  NAME_FILTER,
  PERIOD_FILTER,
  STATUS_FILTER
} from '../../../constants'
import { detailsMenu, infoHeaders, isJobAbortable, JOB_STEADY_STATES } from '../jobs.util'
import jobsActions from '../../../actions/jobs'
import functionsActions from '../../../actions/functions'
import workflowsActions from '../../../actions/workflow'
import filtersActions from '../../../actions/filters'
import notificationActions from '../../../actions/notification'

import { ReactComponent as Run } from 'igz-controls/images/run.svg'
import { ReactComponent as Cancel } from 'igz-controls/images/close.svg'
import { ReactComponent as Yaml } from 'igz-controls/images/yaml.svg'

export const generateFilters = () => [
  { type: PERIOD_FILTER, label: 'Period:' },
  { type: STATUS_FILTER, label: 'Status:' },
  { type: NAME_FILTER, label: 'Name:' },
  { type: DATE_RANGE_TIME_FILTER, label: 'Created at:' }
]

export const generatePageData = (fetchJobLogs, removeJobLogs) => {
  return {
    page: JOBS_PAGE,
    details: {
      menu: detailsMenu,
      type: JOBS_PAGE,
      infoHeaders,
      refreshLogs: fetchJobLogs,
      removeLogs: removeJobLogs,
      withLogsRefreshBtn: true
    }
  }
}

export const generateActionsMenu = (
  job,
  handleRerunJob,
  jobs_dashboard_url,
  handleMonitoring,
  abortable_function_kinds,
  handleConfirmAbortJob,
  toggleConvertedYaml
) => [
  {
    label: 'Re-run',
    icon: <Run />,
    hidden: ['local', ''].includes(job?.ui?.originalContent.metadata.labels.kind),
    onClick: handleRerunJob
  },
  {
    label: 'Monitoring',
    tooltip: !jobs_dashboard_url
      ? 'Grafana service unavailable'
      : job.labels?.includes('kind: dask')
      ? 'Unavailable for Dask jobs'
      : '',
    disabled: !jobs_dashboard_url || job.labels?.includes('kind: dask'),
    onClick: handleMonitoring
  },
  {
    label: 'Abort',
    icon: <Cancel />,
    onClick: handleConfirmAbortJob,
    tooltip: isJobAbortable(job, abortable_function_kinds) ? '' : 'Cannot abort jobs of this kind',
    disabled: !isJobAbortable(job, abortable_function_kinds),
    hidden: JOB_STEADY_STATES.includes(job?.state?.value)
  },
  {
    label: 'View YAML',
    icon: <Yaml />,
    onClick: toggleConvertedYaml
  }
]

export const monitorWorkflowsActionCreator = {
  abortJob: jobsActions.abortJob,
  fetchFunctionLogs: functionsActions.fetchFunctionLogs,
  fetchJob: jobsActions.fetchJob,
  fetchJobFunction: jobsActions.fetchJobFunction,
  fetchJobLogs: jobsActions.fetchJobLogs,
  fetchJobs: jobsActions.fetchJobs,
  fetchWorkflow: workflowsActions.fetchWorkflow,
  fetchWorkflows: workflowsActions.fetchWorkflows,
  getFunction: functionsActions.getFunction,
  getFunctionWithHash: functionsActions.getFunctionWithHash,
  removeFunction: functionsActions.removeFunction,
  removeFunctionLogs: functionsActions.removeFunctionLogs,
  removeJobLogs: jobsActions.removeJobLogs,
  removeNewJob: jobsActions.removeNewJob,
  resetWorkflow: workflowsActions.resetWorkflow,
  setFilters: filtersActions.setFilters,
  setNotification: notificationActions.setNotification
}
