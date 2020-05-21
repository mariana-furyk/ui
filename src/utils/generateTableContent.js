import { isEmpty, map } from 'lodash'

import { ARTIFACTS_PAGE, JOBS_PAGE } from '../constants'
import createJobsContent from './createJobsContent'
import createFunctionsContent from './createFunctionsContent'
import createArtifactsContent from './createArtifactsContent'

export const generateTableContent = (
  content,
  groupedByName,
  groupedByWorkflow,
  groupFilter,
  page,
  setLoading
) => {
  if (!isEmpty(groupedByName) && groupFilter === 'name') {
    setLoading(true)

    return map(groupedByName, group =>
      page === JOBS_PAGE
        ? createJobsContent(group)
        : createFunctionsContent(group)
    )
  } else if (!isEmpty(groupedByWorkflow) && groupFilter === 'workflow') {
    setLoading(true)

    return map(group => createJobsContent(group))
  } else if (groupFilter === 'none' || !groupFilter) {
    setLoading(true)

    return page === JOBS_PAGE
      ? createJobsContent(content)
      : page === ARTIFACTS_PAGE
      ? createArtifactsContent(content)
      : createFunctionsContent(content)
  } else return []
}
