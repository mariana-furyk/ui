import React from 'react'
import PropTypes from 'prop-types'
import { find } from 'lodash'

import JobsPanelSection from '../../elements/JobsPanelSection/JobsPanelSection'
import JobsPanelTable from '../../elements/JobsPanelTable/JobsPanelTable'
import Input from '../../common/Input/Input'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../../elements/TooltipTemplate/TextTooltipTemplate'
import JobsPanelTableAddItemRow from '../../elements/JobsPanelTableAddItemRow/JobsPanelTableAddItemRow'
import Select from '../../common/Select/Select'

import { ReactComponent as Plus } from '../../images/plus.svg'

import panelData from '../JobsPanel/panelData'
import { parametersActions } from './parametersReducer'

const JobsPanelParametersView = ({
  addNewParameter,
  handleAddNewItem,
  handleDeleteParameter,
  handleEditParameter,
  match,
  parametersDispatch,
  parametersState,
  parameters,
  selectOptions,
  setAddNewParameter
}) => {
  return (
    <div className="job-panel__item">
      <JobsPanelSection title="Parameters">
        <JobsPanelTable
          addNewItem={addNewParameter}
          className="parameters"
          content={parameters}
          handleDeleteItems={handleDeleteParameter}
          handleEditParameter={handleEditParameter}
          headers={panelData.parameters['table-headers']}
          match={match}
          section="parameters"
          selectedItem={parametersState.selectedParameter}
          setSelectedParameter={selectedParam =>
            parametersDispatch({
              type: parametersActions.SET_SELECTED_PARAMETER,
              payload: selectedParam
            })
          }
        >
          {addNewParameter ? (
            <div className="table__row-add-item">
              <div className="input-row-wrapper">
                <Input
                  onChange={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_NAME,
                      payload: value
                    })
                  }
                  label="Name"
                  className="input-row__item"
                  floatingLabel
                  type="text"
                />
                <Select
                  className="parameters-value-type"
                  label={parametersState.newParameter.valueType}
                  match={match}
                  onClick={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_VALUE_TYPE,
                      payload: find(selectOptions.parametersValueType, [
                        'id',
                        value
                      ]).id
                    })
                  }
                  options={selectOptions.parametersValueType}
                />
                <Input
                  onChange={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_VALUE,
                      payload: value
                    })
                  }
                  label="Value/s"
                  className="input-row__item parameter-value"
                  floatingLabel
                  type="text"
                />
                <Select
                  label={parametersState.newParameter.parameterType}
                  className="select-parameters-type"
                  match={match}
                  onClick={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_TYPE,
                      payload: find(selectOptions.parameterType, ['id', value])
                        .id
                    })
                  }
                  options={selectOptions.parameterType}
                />
              </div>
              <button
                className="add-input btn-add"
                onClick={() => handleAddNewItem(true)}
              >
                <Tooltip template={<TextTooltipTemplate text="Add item" />}>
                  <Plus />
                </Tooltip>
              </button>
            </div>
          ) : (
            <JobsPanelTableAddItemRow
              onClick={setAddNewParameter}
              text="parameter"
            />
          )}
        </JobsPanelTable>
        <button className="btn-load">Load file</button>
      </JobsPanelSection>
    </div>
  )
}

JobsPanelParametersView.propTypes = {
  addNewParameter: PropTypes.bool.isRequired,
  handleAddNewItem: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  parametersDispatch: PropTypes.func.isRequired,
  parametersState: PropTypes.shape({}).isRequired,
  selectOptions: PropTypes.shape({}).isRequired,
  setAddNewParameter: PropTypes.func.isRequired
}

export default JobsPanelParametersView
