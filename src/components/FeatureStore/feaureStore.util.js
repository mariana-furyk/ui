export const infoHeaders = [
  { label: 'Hash', id: 'hash' },
  { label: 'Key', id: 'key' },
  { label: 'Iter', id: 'iter' },
  { label: 'Size', id: 'size' },
  { label: 'Path', id: 'path' },
  { label: 'Tree', id: 'tree' },
  { label: 'Updated', id: 'updated' },
  { label: 'Labels', id: 'labels' },
  { label: 'Sources', id: 'sources' }
]
export const detailsMenu = ['info', 'preview']
export const filters = ['tree', 'labels', 'name']
export const page = 'ARTIFACTS'
export const pageKind = 'feature-store'
export const sources = ['name', 'path']
export const registerArtifactDialogTitle = 'Register dataset'
export const tableHeaders = [
  {
    header: 'Name',
    class: 'artifacts_medium'
  },
  {
    header: 'Labels',
    class: 'artifacts_big'
  },
  {
    header: 'Producer',
    class: 'artifacts_small'
  },
  {
    header: 'Owner',
    class: 'artifacts_small'
  },
  {
    header: 'Updated',
    class: 'artifacts_small'
  },
  {
    header: 'Size',
    class: 'artifacts_small'
  },

  {
    header: '',
    class: 'artifacts_extra-small'
  },
  {
    header: '',
    class: 'artifacts_extra-small'
  },
  {
    header: '',
    class: 'action_cell'
  }
]
export const tabs = ['datasets']

export const generatePageData = openPopupDialog => ({
  detailsMenu,
  filters,
  infoHeaders,
  page,
  pageActionsMenu: [
    {
      type: 'button',
      buttonTitle: registerArtifactDialogTitle,
      onClick: openPopupDialog
    }
  ],
  pageKind,
  tableHeaders,
  tabs
})
