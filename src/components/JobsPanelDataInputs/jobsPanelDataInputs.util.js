import { isEveryObjectValueEmpty } from '../../utils/isEveryObjectValueEmpty'
import { inputsActions } from './jobsPanelDataInputsReducer'

export const handleAddItem = (
  currentTableData,
  inputsDispatch,
  newItemObj,
  newJobData,
  panelDispatch,
  previousData,
  removeNewItemObj,
  setAddNewItem,
  setCurrentTableData,
  setPreviousData,
  setNewJobData
) => {
  if (isEveryObjectValueEmpty(newItemObj)) {
    inputsDispatch({
      type: removeNewItemObj
    })

    return inputsDispatch({
      type: setAddNewItem,
      payload: false
    })
  }

  panelDispatch({
    type: setPreviousData,
    payload: [
      ...previousData,
      {
        isDefault: false,
        data: {
          name: newItemObj.name,
          path:
            newItemObj.path.pathType +
            newItemObj.path.project +
            '/' +
            newItemObj.path.artifact
        }
      }
    ]
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: [
      ...currentTableData,
      {
        isDefault: false,
        data: {
          name: newItemObj.name,
          path:
            newItemObj.path.pathType +
            newItemObj.path.project +
            '/' +
            newItemObj.path.artifact
        }
      }
    ]
  })
  inputsDispatch({
    type: setAddNewItem,
    payload: false
  })
  inputsDispatch({
    type: removeNewItemObj
  })
  setNewJobData({
    ...newJobData,
    [newItemObj.name]:
      newItemObj.path.pathType +
      newItemObj.path.project +
      '/' +
      newItemObj.path.artifact
  })
}

export const handleEdit = (
  currentPanelData,
  currentTableData,
  inputsDispatch,
  newName,
  panelDispatch,
  removeSelectedItem,
  selectedItem,
  setCurrentPanelData,
  setCurrentTableData,
  setPreviousPanelData
) => {
  const currentDataObj = { ...currentPanelData }

  if (newName) {
    delete currentDataObj[selectedItem.name]

    currentDataObj[newName] = selectedItem.path
  } else {
    currentDataObj[selectedItem.name] = selectedItem.path
  }

  setCurrentPanelData({ ...currentDataObj })

  const newDataArray = currentTableData.map(dataItem => {
    if (dataItem.data.name === selectedItem.name) {
      dataItem.data.name = newName || selectedItem.name
      dataItem.data.path = selectedItem.path
    }

    return dataItem
  })

  panelDispatch({
    type: setPreviousPanelData,
    payload: newDataArray
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: newDataArray
  })
  inputsDispatch({
    type: removeSelectedItem,
    payload: {}
  })
}

export const handleDelete = (
  currentPanelData,
  currentTableData,
  panelDispatch,
  previousPanelData,
  selectedItem,
  setCurrentPanelData,
  setCurrentTableData,
  setPreviousPanelData
) => {
  const newInputs = { ...currentPanelData }
  delete newInputs[selectedItem.data.name]

  setCurrentPanelData({ ...newInputs })

  panelDispatch({
    type: setPreviousPanelData,
    payload: previousPanelData.filter(
      dataItem => dataItem.data.name !== selectedItem.data.name
    )
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: currentTableData.filter(
      dataItem => dataItem.data.name !== selectedItem.data.name
    )
  })
}

export const comboboxSelectList = [
  {
    label: 'store',
    id: 'store://'
  },
  {
    label: 'URL',
    id: 's3://'
  }
]

export const S3_INPUT_PATH_TYPE = 's3://'

export const handleInputPathTypeChange = (
  inputsDispatch,
  newInput,
  pathType,
  pathPlaceholder
) => {
  if (pathType === S3_INPUT_PATH_TYPE && pathPlaceholder.length === 0) {
    inputsDispatch({
      type: inputsActions.SET_PATH_PLACEHOLDER,
      payload: 'bucket/path'
    })
  } else if (pathType !== S3_INPUT_PATH_TYPE && pathPlaceholder.length > 0) {
    inputsDispatch({
      type: inputsActions.SET_PATH_PLACEHOLDER,
      payload: ''
    })
  }

  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_PATH,
    payload: {
      ...newInput.path,
      pathType: pathType
    }
  })
}

export const handleInputPathChange = (inputsDispatch, inputsState, path) => {
  const pathItems = path.split('/')

  if (pathItems[1] === '' || pathItems[1]?.length > 0) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_PROJECT_PATH_ENTERED,
      payload: true
    })
  } else if (inputsState.newInputProjectPathEntered) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_PROJECT_PATH_ENTERED,
      payload: false
    })
  }

  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_PATH,
    payload: {
      ...inputsState.newInput.path,
      project: pathItems[0],
      artifact: pathItems[1] ? pathItems[1] : inputsState.newInput.path.artifact
    }
  })
}
