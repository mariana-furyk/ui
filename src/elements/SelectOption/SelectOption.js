import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CheckBox from '../../common/CheckBox/CheckBox'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'

import './selectOption.scss'
import { SELECT_OPTION } from '../../types'

const SelectOption = ({ item, onClick, selectType, selectedId }) => {
  const selectClassName = classnames(
    'select__item',
    item.hidden && 'hidden',
    item.disabled && 'disabled'
  )

  if (selectType === 'checkbox') {
    return (
      <div data-testid="select-checkbox" className="select__item">
        <CheckBox item={item} selectedId={selectedId} onChange={onClick}>
          {item.status && (
            <span className={`state-${item.status}-job status`} />
          )}
          {item.label}
        </CheckBox>
      </div>
    )
  }

  return (
    <div
      data-testid="select-option"
      className={selectClassName}
      onClick={() => {
        !item.disabled && onClick(item.id)
      }}
    >
      {item.icon && (
        <span data-testid="select-icon" className="select__icon">
          {item.icon}
        </span>
      )}
      {item.status && <span className={`state-${item.status}-job status`} />}
      <div className="data-ellipsis">
        <Tooltip template={<TextTooltipTemplate text={item.label} />}>
          {item.label}
        </Tooltip>
      </div>
      {item.subLabel && (
        <Tooltip
          className="sub-label"
          template={<TextTooltipTemplate text={item.subLabel} />}
        >
          {item.subLabel}
        </Tooltip>
      )}
    </div>
  )
}

SelectOption.defaultProps = {
  onClick: () => {},
  selectType: ''
}

SelectOption.propTypes = {
  disabled: PropTypes.bool,
  item: SELECT_OPTION.isRequired,
  onClick: PropTypes.func,
  selectType: PropTypes.string,
  selectedId: PropTypes.string
}

export default SelectOption
