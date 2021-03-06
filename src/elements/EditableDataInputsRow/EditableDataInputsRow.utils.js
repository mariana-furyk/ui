import { isNil } from 'lodash'

import { isEveryObjectValueEmpty } from '../../utils/isEveryObjectValueEmpty'
import { inputsActions } from '../../components/JobsPanelDataInputs/jobsPanelDataInputsReducer'
import {
  AZURE_STORAGE_INPUT_PATH_SCHEME,
  GOOGLE_STORAGE_INPUT_PATH_SCHEME,
  HTTP_STORAGE_INPUT_PATH_SCHEME,
  HTTPS_STORAGE_INPUT_PATH_SCHEME,
  MLRUN_STORAGE_INPUT_PATH_SCHEME,
  S3_INPUT_PATH_SCHEME,
  V3IO_INPUT_PATH_SCHEME
} from '../../constants'

export const applyEditButtonHandler = (
  handleEdit,
  inputName,
  inputsDispatch,
  requiredField,
  selectedDataInput,
  setRequiredField
) => {
  if (
    [
      HTTP_STORAGE_INPUT_PATH_SCHEME,
      HTTPS_STORAGE_INPUT_PATH_SCHEME,
      MLRUN_STORAGE_INPUT_PATH_SCHEME
    ].includes(selectedDataInput.data.path.pathType)
  ) {
    if (
      !selectedDataInput.data.path.value.split('/')[2] ||
      selectedDataInput.data.path.value.split('/')[2]?.length === 0
    ) {
      return setRequiredField(state => ({ ...state, path: true }))
    }
  } else if (selectedDataInput.data.path.url.length === 0) {
    return setRequiredField(state => ({ ...state, path: true }))
  }

  if (inputName.length === 0) {
    return setRequiredField(state => ({ ...state, name: true }))
  }

  if (!isEveryObjectValueEmpty(requiredField)) {
    setRequiredField({
      name: inputName.length > 0,
      path:
        selectedDataInput.data.path.value.split('/')[2]?.length > 0 ||
        selectedDataInput.data.path.url.length > 0
    })
  }

  inputsDispatch({
    type: inputsActions.SET_COMBOBOX_MATCHES,
    payload: []
  })
  handleEdit(selectedDataInput, true)
}

export const handleEditInputPath = (
  inputsDispatch,
  inputsState,
  path,
  selectedDataInput,
  setSelectedDataInput
) => {
  if (
    [
      AZURE_STORAGE_INPUT_PATH_SCHEME,
      GOOGLE_STORAGE_INPUT_PATH_SCHEME,
      S3_INPUT_PATH_SCHEME,
      V3IO_INPUT_PATH_SCHEME
    ].includes(selectedDataInput.data.path.pathType)
  ) {
    return setSelectedDataInput({
      ...selectedDataInput,
      data: {
        ...selectedDataInput.data,
        path: {
          ...selectedDataInput.data.path,
          url: path,
          value: ''
        }
      }
    })
  }

  const pathItems = path.split('/')

  if (isNil(pathItems[2])) {
    if (inputsState.artifacts.length > 0) {
      inputsDispatch({
        type: inputsActions.SET_ARTIFACTS,
        payload: []
      })
    }

    if (inputsState.featureVectors.length > 0) {
      inputsDispatch({
        type: inputsActions.SET_FEATURE_VECTORS,
        payload: []
      })
    }
  }

  if (path !== selectedDataInput.data.path.value) {
    setSelectedDataInput({
      ...selectedDataInput,
      data: {
        ...selectedDataInput.data,
        path: {
          ...selectedDataInput.data.path,
          value: path,
          url: ''
        }
      }
    })
  }
  const projectItems =
    inputsState[pathItems[0] === 'artifacts' ? 'artifacts' : 'featureVectors']
  const projectItemIsEntered = projectItems.find(
    projectItem => projectItem.id === pathItems[2]
  )

  inputsDispatch({
    type: inputsActions.SET_INPUT_STORE_PATH_TYPE_ENTERED,
    payload: typeof pathItems[1] === 'string'
  })
  inputsDispatch({
    type: inputsActions.SET_INPUT_PROJECT_PATH_ENTERED,
    payload: typeof pathItems[2] === 'string'
  })
  inputsDispatch({
    type: inputsActions.SET_INPUT_PROJECT_ITEM_PATH_ENTERED,
    payload: Boolean(projectItemIsEntered)
  })
}
