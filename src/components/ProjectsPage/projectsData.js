import React from 'react'

import { ReactComponent as Yaml } from '../../images/yaml.svg'
import { ReactComponent as Delete } from '../../images/delete.svg'

export const generatePageActionsMenu = handleNewProjectClick => [
  {
    type: 'button',
    buttonTitle: 'New Project',
    onClick: handleNewProjectClick
  }
]

export const projectsPageData = {
  page: 'PROJECTS'
}
export const generateProjectActionsMenu = (
  toggleConvertToYaml,
  deleteProject
) => [
  {
    label: 'View YAML',
    icon: <Yaml />,
    onClick: toggleConvertToYaml
  },
  {
    label: 'Delete',
    icon: <Delete />,
    onClick: deleteProject
  }
]
export const successProjectDeletingMessage = 'Project deleted successfully'
export const failedProjectDeletingMessage = 'Failed to delete project'
