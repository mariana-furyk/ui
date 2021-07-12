import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input/Input'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import JobsPanelTableAddItemRow from '../JobsPanelTableAddItemRow/JobsPanelTableAddItemRow'
import JobsPanelTable from '../JobsPanelTable/JobsPanelTable'
import Select from '../../common/Select/Select'

import { selectOptions } from '../../components/JobsPanelAdvanced/jobsPanelAdvanced.util'
import { isNameNotUnique } from '../../components/JobsPanel/jobsPanel.util'

import { ReactComponent as Plus } from '../../images/plus.svg'

export const JobsPanelAdvancedTable = ({
  addNewItem,
  className,
  content,
  handleAddNewItem,
  handleDeleteItems,
  handleEditItems,
  headers,
  match,
  newName,
  section,
  selectedId,
  selectedItem,
  setAddNewItem,
  setNewItemName,
  setNewItemValue,
  setSelectedItem
}) => {
  return (
    <JobsPanelTable
      addNewItem={addNewItem}
      className={className}
      content={content}
      handleDeleteItems={handleDeleteItems}
      handleEditItems={handleEditItems}
      headers={headers}
      match={match}
      section={section}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    >
      {addNewItem ? (
        <div className="table__row-add-item">
          <div className="input-row-wrapper">
            {section.includes('secrets') ? (
              <Select
                density="medium"
                onClick={setNewItemName}
                label={selectedId.length ? selectedId : 'Kind'}
                options={selectOptions.secretKind}
              />
            ) : (
              <Input
                className="input-row__item"
                density="medium"
                floatingLabel
                invalid={isNameNotUnique(newName, content)}
                invalidText="Name already exists"
                label="Name"
                onChange={setNewItemName}
                type="text"
              />
            )}
            <Input
              className="input-row__item input-row__item_edit"
              density="medium"
              floatingLabel
              label="Value"
              onChange={setNewItemValue}
              type="text"
            />
          </div>
          <button
            className="add-input btn-add"
            disabled={isNameNotUnique(newName, content)}
            onClick={() => handleAddNewItem(section.includes('env') && true)}
          >
            <Tooltip template={<TextTooltipTemplate text="Add item" />}>
              <Plus />
            </Tooltip>
          </button>
        </div>
      ) : (
        <JobsPanelTableAddItemRow
          onClick={setAddNewItem}
          text={section.includes('secrets') ? 'secret' : 'environment variable'}
        />
      )}
    </JobsPanelTable>
  )
}

JobsPanelAdvancedTable.defaultProps = {
  className: '',
  newName: '',
  selectedId: ''
}

JobsPanelAdvancedTable.propTypes = {
  addNewItem: PropTypes.bool.isRequired,
  className: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleAddNewItem: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
  handleEditItems: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.shape({}).isRequired,
  newName: PropTypes.string,
  section: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
  selectedItem: PropTypes.shape({}).isRequired,
  setAddNewItem: PropTypes.func.isRequired,
  setNewItemName: PropTypes.func.isRequired,
  setNewItemValue: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired
}
