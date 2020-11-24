import { isEmpty, map } from 'lodash'

import { ARTIFACTS_PAGE, JOBS_PAGE } from '../constants'
import createJobsContent from './createJobsContent'
import createFunctionsContent from './createFunctionsContent'
import createArtifactsContent from './createArtifactsContent'

export const generateTableContent = (
  content,
  featureStoreTab,
  groupedByName,
  groupedByWorkflow,
  groupFilter,
  page,
  pageKind,
  scheduled,
  setLoading
) => {
  if (!isEmpty(groupedByName) && groupFilter === 'name') {
    setLoading(true)

    return map(groupedByName, group =>
      page === JOBS_PAGE
        ? createJobsContent(group, false)
        : createFunctionsContent(group)
    )
  } else if (!isEmpty(groupedByWorkflow) && groupFilter === 'workflow') {
    setLoading(true)

    return map(groupedByWorkflow, group => createJobsContent(group, true))
  } else if (groupFilter === 'none' || !groupFilter) {
    setLoading && setLoading(true)

    return page === JOBS_PAGE
      ? createJobsContent(content, false, scheduled)
      : page === ARTIFACTS_PAGE
      ? createArtifactsContent(content, pageKind, featureStoreTab)
      : createFunctionsContent(content)
  } else return []
}
