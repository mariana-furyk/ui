import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../TooltipTemplate/TextTooltipTemplate'
import Chip from '../../common/Chip/Chip'

import { getChipLabelAndValue } from '../../utils/getChipLabelAndValue'
import { getFirstScrollableParent } from '../../utils/getFirstScrollableParent'
import { CHIP_OPTIONS } from '../../types'

import './hiddenChipsBlock.scss'

const HiddenChipsBlock = ({
  chipIndex,
  chips,
  chipOptions,
  className,
  editConfig,
  handleEditChip,
  handleIsEdit,
  handleRemoveChip,
  handleShowElements,
  isEditMode,
  setEditConfig
}) => {
  const [isTop, setIsTop] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const hiddenRef = useRef()
  const offset = 28
  const hiddenChipsBlockClassNames = classnames(
    'chip-block-hidden',
    isTop ? 'chip-block-hidden_top' : 'chip-block-hidden_bottom',
    isVisible && 'chip-block-hidden_visible'
  )

  useEffect(() => {
    if (hiddenRef?.current) {
      const scrollableParent = getFirstScrollableParent(
        hiddenRef.current.offsetParent
      )
      const { height, top } = hiddenRef.current.getBoundingClientRect()

      if (
        hiddenRef.current.offsetParent.getBoundingClientRect().top -
          hiddenRef.current.offsetParent.clientHeight -
          height -
          offset <
          0 ||
        scrollableParent.getBoundingClientRect().top > top
      ) {
        setIsTop(true)
      }

      setIsVisible(true)
    }
  }, [hiddenRef, offset])

  useEffect(() => {
    if (chips.length === 0) {
      handleShowElements()
    }
  })

  return (
    <div ref={hiddenRef} className={hiddenChipsBlockClassNames}>
      {chips?.map((element, index) => {
        const { chipLabel, chipValue } = getChipLabelAndValue(element)

        return (
          <Tooltip
            key={element.value}
            template={
              <TextTooltipTemplate
                text={
                  element.delimiter ? (
                    <span>
                      {chipLabel}
                      <span className="chip__delimiter">
                        {element.delimiter}
                      </span>
                      {chipValue}
                    </span>
                  ) : (
                    element.value
                  )
                }
              />
            }
          >
            <Chip
              chip={element}
              chipIndex={`${index}${chipIndex}`}
              chipOptions={chipOptions}
              className={className}
              editConfig={editConfig}
              handleEditChip={handleEditChip}
              handleIsEdit={handleIsEdit}
              handleRemoveChip={handleRemoveChip}
              hiddenChips
              isEditMode={isEditMode}
              ref={hiddenRef}
              setEditConfig={setEditConfig}
            />
          </Tooltip>
        )
      })}
    </div>
  )
}

HiddenChipsBlock.defaultProps = {
  chips: [],
  chipIndex: 0,
  editChip: () => {},
  editConfig: {},
  handleIsEdit: () => {},
  isEditMode: false,
  removeChip: () => {},
  setEditConfig: () => {}
}

HiddenChipsBlock.propTypes = {
  className: PropTypes.string,
  chips: PropTypes.arrayOf(PropTypes.shape({})),
  chipOptions: CHIP_OPTIONS.isRequired,
  chipIndex: PropTypes.number,
  editConfig: PropTypes.shape({}),
  handleEditChip: PropTypes.func,
  handleIsEdit: PropTypes.func,
  handleRemoveChip: PropTypes.func,
  handleShowElements: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  setEditConfig: PropTypes.func
}

export default HiddenChipsBlock
