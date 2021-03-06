import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import JobsPanelDataInputsView from './JobsPanelDataInputsView'

import {
  initialState,
  inputsActions,
  jobsPanelDataInputsReducer
} from './jobsPanelDataInputsReducer'
import { panelActions } from '../JobsPanel/panelReducer'
import {
  generateComboboxMatchesList,
  handleAddItem,
  handleDelete,
  handleEdit,
  handleInputPathChange,
  handleInputPathTypeChange
} from './jobsPanelDataInputs.util'
import artifactsAction from '../../actions/artifacts'
import { isEveryObjectValueEmpty } from '../../utils/isEveryObjectValueEmpty'
import { MLRUN_STORAGE_INPUT_PATH_SCHEME } from '../../constants'

const JobsPanelDataInputs = ({
  fetchArtifacts,
  fetchFeatureVectors,
  inputs,
  match,
  panelDispatch,
  panelState,
  projectStore,
  setNewJobInputs
}) => {
  const [inputsState, inputsDispatch] = useReducer(
    jobsPanelDataInputsReducer,
    initialState
  )

  useEffect(() => {
    if (
      inputsState.inputStorePathTypeEntered &&
      (inputsState.projects.length === 0 ||
        inputsState.newInput.path.project.length === 0 ||
        (!isEveryObjectValueEmpty(inputsState.selectedDataInput) &&
          inputsState.selectedDataInput.data.path.value.split('/')[1]
            ?.length === 0))
    ) {
      const projectsList = projectStore.projects.map(project => ({
        label:
          project.metadata.name === match.params.projectName
            ? 'Current project'
            : project.metadata.name,
        id: project.metadata.name
      }))

      inputsDispatch({
        type: inputsActions.SET_PROJECTS,
        payload: projectsList
      })
    }
  }, [
    inputsState.newInput.path.project.length,
    inputsState.projects.length,
    match.params.projectName,
    projectStore.projects,
    inputsState.selectedDataInput.data.path.value,
    inputsState.selectedDataInput,
    inputsState.inputStorePathTypeEntered,
    inputsState.newInput.path.project
  ])

  useEffect(() => {
    if (inputsState.inputProjectPathEntered) {
      const projectName =
        inputsState.newInput.path?.project ||
        inputsState.selectedDataInput.data.path.value.split('/')[1]
      const storePathType =
        inputsState.newInput.path.storePathType ||
        inputsState.selectedDataInput.data.path.value.split('/')[0]
      if (storePathType === 'artifacts' && inputsState.artifacts.length === 0) {
        fetchArtifacts({
          project: projectName
        }).then(artifacts => {
          const artifactsList = artifacts
            .map(artifact => {
              const key = artifact.link_iteration
                ? artifact.link_iteration.db_key
                : artifact.key ?? ''
              return {
                label: key,
                id: key
              }
            })
            .filter(artifact => artifact.label !== '')

          inputsDispatch({
            type: inputsActions.SET_ARTIFACTS,
            payload: artifactsList
          })
        })
      } else if (
        storePathType === 'feature-vectors' &&
        inputsState.featureVectors.length === 0
      ) {
        fetchFeatureVectors({
          project: projectName
        }).then(featureVectors => {
          inputsDispatch({
            type: inputsActions.SET_FEATURE_VECTORS,
            payload: featureVectors.map(featureVector => {
              return {
                label: featureVector.metadata.name,
                id: featureVector.metadata.name
              }
            })
          })
        })
      }
    }
  }, [
    fetchArtifacts,
    inputsState.artifacts.length,
    inputsState.featureVectors.length,
    inputsState.newInput.path.project,
    inputsState.inputProjectPathEntered,
    inputsState.selectedDataInput.data.path.value,
    inputsState.newInput.path,
    fetchFeatureVectors
  ])

  useEffect(() => {
    if (
      inputsState.newInput.path.pathType === MLRUN_STORAGE_INPUT_PATH_SCHEME ||
      inputsState.selectedDataInput.data.path.pathType ===
        MLRUN_STORAGE_INPUT_PATH_SCHEME
    ) {
      inputsDispatch({
        type: inputsActions.SET_COMBOBOX_MATCHES,
        payload: generateComboboxMatchesList(
          inputsState.artifacts,
          inputsState.featureVectors,
          inputsState.inputStorePathTypeEntered,
          inputsState.inputProjectPathEntered,
          inputsState.inputProjectItemPathEntered,
          inputsState.newInput,
          inputsState.projects,
          match.params.projectName,
          inputsState.selectedDataInput.data.path
        )
      })
    }
  }, [
    inputsState.artifacts,
    inputsState.featureVectors,
    inputsState.inputProjectItemPathEntered,
    inputsState.inputProjectPathEntered,
    inputsState.inputStorePathTypeEntered,
    inputsState.newInput,
    inputsState.projects,
    inputsState.selectedDataInput.data.path,
    match.params.projectName
  ])

  const handleAddNewItem = () => {
    handleAddItem(
      panelState.tableData.dataInputs,
      inputsDispatch,
      inputsState.newInput,
      inputs,
      panelDispatch,
      panelState.previousPanelData.tableData.dataInputs,
      inputsActions.REMOVE_NEW_INPUT_DATA,
      inputsActions.SET_ADD_NEW_INPUT,
      panelActions.SET_TABLE_DATA_INPUTS,
      panelActions.SET_PREVIOUS_PANEL_DATA_INPUTS,
      setNewJobInputs,
      inputsActions.SET_PATH_PLACEHOLDER,
      inputsState.newInputUrlPath,
      inputsActions.SET_NEW_INPUT_URL_PATH
    )
  }

  const handleEditItems = () => {
    handleEdit(
      inputs,
      panelState.tableData.dataInputs,
      inputsDispatch,
      panelDispatch,
      inputsActions.SET_SELECTED_INPUT,
      inputsState.selectedDataInput.data,
      setNewJobInputs,
      panelActions.SET_TABLE_DATA_INPUTS,
      panelActions.SET_PREVIOUS_PANEL_DATA_INPUTS
    )
  }

  const handleDeleteItems = item => {
    handleDelete(
      inputs,
      panelState.tableData.dataInputs,
      panelDispatch,
      panelState.previousPanelData.tableData.dataInputs,
      item,
      setNewJobInputs,
      panelActions.SET_TABLE_DATA_INPUTS,
      panelActions.SET_PREVIOUS_PANEL_DATA_INPUTS
    )
  }

  const handlePathTypeChange = path => {
    handleInputPathTypeChange(
      inputsDispatch,
      inputsState.newInput,
      path.replace(/:\/\/.*$/g, '://'),
      inputsState.pathPlaceholder,
      inputsState.newInputDefaultPathProject,
      match.params.projectName
    )
  }

  const handlePathChange = path => {
    handleInputPathChange(inputsDispatch, inputsState, path)
  }

  return (
    <JobsPanelDataInputsView
      comboboxMatchesList={
        inputsState.newInput.path.pathType ===
          MLRUN_STORAGE_INPUT_PATH_SCHEME ||
        inputsState.selectedDataInput.data.path.pathType ===
          MLRUN_STORAGE_INPUT_PATH_SCHEME
          ? inputsState.comboboxMatches
          : []
      }
      handleAddNewItem={handleAddNewItem}
      handleDeleteItems={handleDeleteItems}
      handleEditItems={handleEditItems}
      handlePathChange={handlePathChange}
      handlePathTypeChange={handlePathTypeChange}
      inputsState={inputsState}
      inputsDispatch={inputsDispatch}
      match={match}
      panelDispatch={panelDispatch}
      panelState={panelState}
    />
  )
}

JobsPanelDataInputs.propTypes = {
  inputs: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  panelDispatch: PropTypes.func.isRequired,
  panelState: PropTypes.shape({}).isRequired,
  setNewJobInputs: PropTypes.func.isRequired
}

export default connect(projectStore => projectStore, { ...artifactsAction })(
  JobsPanelDataInputs
)
