import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { ReactComponent as Arrow } from '../../images/arrow.svg'

import './combobox.scss'

const Combobox = ({ comboboxClassName, dropdown }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [dropdownStyle, setDropdownStyle] = useState({
    position: 'absolute',
    top: '40px',
    left: 0
  })
  const [showSelectDropdown, setShowSelectDropdown] = useState(false)
  const [showMatchesDropdown, setShowMatchesDropdown] = useState(false)

  const comboboxRef = React.createRef()

  const comboboxClassNames = classnames(comboboxClassName, 'combobox')
  const iconClassNames = classnames(
    showSelectDropdown && 'combobox-icon_open',
    'combobox-icon'
  )

  const inputOnChange = event => {
    const value = event.target.value
    const div = document.createElement('div')
    div.innerHTML = value
    comboboxRef.current.appendChild(div)

    const rect = div.getBoundingClientRect()

    div.remove()

    setDropdownStyle(state => ({
      ...state,
      left: `${rect.width - 10}px`
    }))
    setInputValue(value)
  }

  const handleDropdownOptionClick = option => {
    if (selectValue.length === 0) {
      setSelectValue(option)
      setInputValue(option)
    } else {
      const inputValueItems = inputValue.slice(selectValue.length).split('/')
      inputValueItems[inputValueItems.length - 1] = option
      setInputValue(selectValue + inputValueItems.join('/'))
    }

    if (showSelectDropdown) {
      setShowSelectDropdown(false)
    }

    if (showMatchesDropdown) {
      setShowMatchesDropdown(false)
    }
  }

  return (
    <div className={comboboxClassNames} ref={comboboxRef}>
      <Arrow
        className={iconClassNames}
        onClick={() => {
          if (showMatchesDropdown) {
            setShowMatchesDropdown(false)
          }
          setShowSelectDropdown(state => !state)
        }}
      />
      <input
        className="combobox-input"
        onChange={inputOnChange}
        type="text"
        value={inputValue}
      />
      {(showSelectDropdown || showMatchesDropdown) && dropdown.length > 0 && (
        <ul style={dropdownStyle} className="combobox-dropdown">
          {dropdown.map(value => (
            <li
              className="combobox-dropdown__option"
              key={value.id}
              onClick={() => handleDropdownOptionClick(value.id)}
            >
              {value.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Combobox.defaultProps = {
  comboboxClassName: ''
}

Combobox.propTypes = {
  comboboxClassName: PropTypes.string
}

export default Combobox
