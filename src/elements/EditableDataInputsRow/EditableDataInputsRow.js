import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'lodash'
import classNames from 'classnames'

import Input from '../../common/Input/Input'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'
import Combobox from '../../common/Combobox/Combobox'
import {
  AZURE_STORAGE_INPUT_PATH_SCHEME,
  comboboxSelectList,
  GOOGLE_STORAGE_INPUT_PATH_SCHEME,
  S3_INPUT_PATH_SCHEME,
  V3IO_INPUT_PATH_SCHEME
} from '../../components/JobsPanelDataInputs/jobsPanelDataInputs.util'
import { inputsActions } from '../../components/JobsPanelDataInputs/jobsPanelDataInputsReducer'
import { isEveryObjectValueEmpty } from '../../utils/isEveryObjectValueEmpty'

const EditableDataInputsRow = ({
  handleEdit,
  selectedDataInput,
  setSelectedDataInput,
  inputsDispatch,
  inputsState,
  comboboxMatchesList
}) => {
  const [selectDefaultValue, setSelectDefaultValue] = useState({
    className: '',
    id: '',
    label: ''
  })
  const [requiredField, setRequiredField] = useState({
    path: false,
    name: false
  })

  const comboboxClassNames = classNames(
    'input-row__item',
    requiredField.path && 'required'
  )

  const typesPlaceholders = {
    [S3_INPUT_PATH_SCHEME]: 'bucket/path',
    [GOOGLE_STORAGE_INPUT_PATH_SCHEME]: 'bucket/path',
    [AZURE_STORAGE_INPUT_PATH_SCHEME]: 'container/path',
    [V3IO_INPUT_PATH_SCHEME]: '/container-name/file'
  }

  useEffect(() => {
    if (selectDefaultValue.label?.length === 0) {
      setSelectDefaultValue({
        id: selectedDataInput.data.path.pathType,
        label: selectedDataInput.data.path.pathType,
        className: `path-type-${selectedDataInput.data.path.pathType?.replace(
          /:\/\/.*$/g,
          ''
        )}`
      })
    }
  }, [selectDefaultValue.label, selectedDataInput.data.path.pathType])

  const handleEditInputPath = path => {
    // handlePathChange(path)
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
    const artifactIsEntered = inputsState.artifacts.find(
      artifact => artifact.id === pathItems[1]
    )

    if (isNil(pathItems[1]) && inputsState.artifacts.length > 0) {
      inputsDispatch({
        type: inputsActions.SET_ARTIFACTS,
        payload: []
      })
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

    inputsDispatch({
      type: inputsActions.SET_INPUT_PROJECT_PATH_ENTERED,
      payload: typeof pathItems[1] === 'string'
    })
    inputsDispatch({
      type: inputsActions.SET_INPUT_ARTIFACT_PATH_ENTERED,
      payload: !!artifactIsEntered
    })
  }

  return (
    <div className="table__row edit-row">
      {selectedDataInput.isDefault ? (
        <div className="table__cell table__cell_disabled">
          <div className="data-ellipsis">{selectedDataInput.data.name}</div>
        </div>
      ) : (
        <div className="table__cell table__cell_edit">
          <Input
            onChange={name =>
              setSelectedDataInput({
                ...selectedDataInput,
                data: {
                  ...selectedDataInput.data,
                  newDataInputName: name
                }
              })
            }
            type="text"
            value={
              selectedDataInput.data.newDataInputName ||
              selectedDataInput.data.name
            }
          />
        </div>
      )}
      <div className="table__cell table__cell_edit">
        <Combobox
          comboboxClassName={comboboxClassNames}
          inputPlaceholder={inputsState.pathPlaceholder}
          matches={comboboxMatchesList}
          inputDefaultValue={
            selectedDataInput.data.path.value || selectedDataInput.data.path.url
          }
          inputOnChange={path => {
            handleEditInputPath(path)
          }}
          selectDefaultValue={selectDefaultValue}
          selectDropdownList={comboboxSelectList}
          selectOnChange={path => {
            inputsDispatch({
              type: inputsActions.SET_PATH_PLACEHOLDER,
              payload: typesPlaceholders[path] || ''
            })
            setSelectedDataInput({
              ...selectedDataInput,
              data: {
                ...selectedDataInput.data,
                path: {
                  ...selectedDataInput.data.path,
                  pathType: path
                }
              }
            })
          }}
        />
      </div>
      <div className="table__cell table__cell-actions">
        <button
          className="apply-edit-btn"
          onClick={() => {
            if (
              selectedDataInput.data.path.value.split('/')[1]?.length === 0 &&
              selectedDataInput.data.path.url.length === 0
            ) {
              return setRequiredField(state => ({ ...state, path: true }))
            } else if (selectedDataInput.data.name.length === 0) {
              return setRequiredField(state => ({ ...state, name: true }))
            }

            if (!isEveryObjectValueEmpty(requiredField)) {
              setRequiredField({
                name: selectedDataInput.data.name.length > 0,
                path: !!(
                  selectedDataInput.data.path.value.split('/')[1]?.length > 0 ||
                  selectedDataInput.data.path.url.length > 0
                )
              })
            }

            handleEdit(selectedDataInput, true)
          }}
        >
          <Checkmark />
        </button>
      </div>
    </div>
  )
}

EditableDataInputsRow.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  selectedDataInput: PropTypes.shape({}).isRequired,
  setSelectedDataInput: PropTypes.func.isRequired
}

export default EditableDataInputsRow
