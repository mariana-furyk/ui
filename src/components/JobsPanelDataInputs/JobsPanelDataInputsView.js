import React from 'react'
import PropTypes from 'prop-types'

import JobsPanelSection from '../../elements/JobsPanelSection/JobsPanelSection'
import Input from '../../common/Input/Input'
import { JobsPanelDataInputsTable } from '../../elements/JobsPanelDataInputsTable/JobsPanelDataInputsTable'

import { panelActions } from '../JobsPanel/panelReducer'
import { comboboxSelectList } from './jobsPanelDataInputs.util'

const JobsPanelDataInputsView = ({
  comboboxMatchesList,
  handleAddNewItem,
  handleDeleteItems,
  handleEditItems,
  inputsDispatch,
  inputsState,
  match,
  panelDispatch,
  panelState
}) => {
  return (
    <div className="job-panel__item">
      <JobsPanelSection title="Data inputs">
        <JobsPanelDataInputsTable
          comboboxMatchesList={comboboxMatchesList}
          comboboxSelectList={comboboxSelectList}
          handleAddNewItem={handleAddNewItem}
          handleEditItems={handleEditItems}
          handleDeleteItems={handleDeleteItems}
          inputsDispatch={inputsDispatch}
          inputsState={inputsState}
          match={match}
          panelState={panelState}
        />
      </JobsPanelSection>
      <JobsPanelSection title="General">
        <Input
          label="Default input path"
          className="default-input"
          onChange={inputValue => {
            panelDispatch({
              type: panelActions.SET_INPUT_PATH,
              payload: inputValue
            })
          }}
          floatingLabel
          type="text"
        />
        <Input
          label="Default artifact path"
          className="default-input"
          onChange={inputValue => {
            panelDispatch({
              type: panelActions.SET_OUTPUT_PATH,
              payload: inputValue
            })
          }}
          floatingLabel
          required={panelState.outputPath.length === 0}
          requiredText="This field is required"
          value={panelState.outputPath}
          type="text"
        />
      </JobsPanelSection>
    </div>
  )
}

JobsPanelDataInputsView.propTypes = {
  handleAddNewItem: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
  handleEditItems: PropTypes.func.isRequired,
  inputsDispatch: PropTypes.func.isRequired,
  inputsState: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  panelDispatch: PropTypes.func.isRequired,
  panelState: PropTypes.shape({}).isRequired
}

export default JobsPanelDataInputsView
