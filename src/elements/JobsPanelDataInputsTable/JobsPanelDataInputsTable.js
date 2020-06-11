import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input/Input'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import JobsPanelTableAddItemRow from '../JobsPanelTableAddItemRow/JobsPanelTableAddItemRow'
import JobsPanelTable from '../JobsPanelTable/JobsPanelTable'

import panelData from '../../components/JobsPanel/panelData'
import { inputsActions } from '../../components/JobsPanelDataInputs/inputsReducer'

import { ReactComponent as Plus } from '../../images/plus.svg'

export const JobsPanelDataInputsTable = ({
  handleAddNewItem,
  handleEditItems,
  handleDeleteItems,
  inputsDispatch,
  inputsState,
  match,
  panelState
}) => {
  return (
    <JobsPanelTable
      addNewItem={inputsState.addNewInput}
      className="data-inputs"
      content={panelState.tableData.dataInputs}
      handleDeleteItems={handleDeleteItems}
      handleEditItems={handleEditItems}
      headers={panelData['data-inputs']['table-headers']}
      match={match}
      section="data-inputs"
      selectedItem={inputsState.selectedDataInput}
      setSelectedDataInput={selectedInput =>
        inputsDispatch({
          type: inputsActions.SET_SELECTED_INPUT,
          payload: selectedInput
        })
      }
    >
      {inputsState.addNewInput ? (
        <div className="table__row-add-item">
          <div className="input-row-wrapper">
            <Input
              onChange={name =>
                inputsDispatch({
                  type: inputsActions.SET_NEW_INPUT_NAME,
                  payload: name
                })
              }
              label="Input name"
              className="input-row__item"
              floatingLabel
              type="text"
            />
            <Input
              onChange={path =>
                inputsDispatch({
                  type: inputsActions.SET_NEW_INPUT_PATH,
                  payload: path
                })
              }
              label="Input path"
              className="input-row__item input-row__item_edit"
              floatingLabel
              type="text"
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
          onClick={value =>
            inputsDispatch({
              type: inputsActions.SET_ADD_NEW_INPUT,
              payload: value
            })
          }
          text="input"
        />
      )}
    </JobsPanelTable>
  )
}

JobsPanelDataInputsTable.propTypes = {
  handleAddNewItem: PropTypes.func.isRequired,
  handleEditItems: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
  inputsDispatch: PropTypes.func.isRequired,
  inputsState: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  panelState: PropTypes.shape({}).isRequired
}
