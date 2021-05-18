import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input/Input'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import JobsPanelTableAddItemRow from '../JobsPanelTableAddItemRow/JobsPanelTableAddItemRow'
import JobsPanelTable from '../JobsPanelTable/JobsPanelTable'
import Select from '../../common/Select/Select'

import { ReactComponent as Plus } from '../../images/plus.svg'
import { selectOptions } from '../../components/JobsPanelAdvanced/jobsPanelAdvanced.util'

export const JobsPanelAdvancedTable = ({
  addNewItem,
  className,
  content,
  handleAddNewItem,
  handleEditItems,
  handleDeleteItems,
  headers,
  match,
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
  selectedId: ''
}

JobsPanelAdvancedTable.propTypes = {
  addNewItem: PropTypes.bool.isRequired,
  className: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleAddNewItem: PropTypes.func.isRequired,
  handleEditItems: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.shape({}).isRequired,
  section: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
  selectedItem: PropTypes.shape({}).isRequired,
  setAddNewItem: PropTypes.func.isRequired,
  setNewItemName: PropTypes.func.isRequired,
  setNewItemValue: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired
}
