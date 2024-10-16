import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

import Tooltip from '../Tooltip/Tooltip'
import TextTooltipTemplate from '../../elements/TooltipTemplate/TextTooltipTemplate'

import { POP_UP_CUSTOM_POSITION } from '../../types'
import { ReactComponent as Close } from '../../images/close.svg'

import './popUpDialog.scss'

const PopUpDialog = ({
  children,
  className,
  closePopUp,
  customPosition,
  headerText
}) => {
  const popUpOverlayRef = useRef(null)
  const popUpClassNames = classnames(
    className,
    'pop-up-dialog__overlay',
    customPosition.element && 'custom-position'
  )

  const calculateCustomPopUpPosition = useCallback(() => {
    if (customPosition.element) {
      const elementRect = customPosition.element.current.getBoundingClientRect()
      const popUpRect = popUpOverlayRef.current.getBoundingClientRect()
      const [
        verticalPosition,
        horizontalPosition
      ] = customPosition.position.split('-')

      const topPosition =
        verticalPosition === 'top'
          ? elementRect.top - popUpRect.height - 5
          : elementRect.bottom + 5
      const leftPosition =
        horizontalPosition === 'left'
          ? elementRect.right - popUpRect.width
          : elementRect.left

      popUpOverlayRef.current.style.top = `${topPosition}px`
      popUpOverlayRef.current.style.left = `${leftPosition}px`
    }
  }, [customPosition])

  useLayoutEffect(() => {
    calculateCustomPopUpPosition()
  }, [calculateCustomPopUpPosition])

  useEffect(() => {
    window.addEventListener('resize', calculateCustomPopUpPosition)

    return () => {
      window.removeEventListener('resize', calculateCustomPopUpPosition)
    }
  })

  return createPortal(
    <div ref={popUpOverlayRef} className={popUpClassNames}>
      <div data-testid="pop-up-dialog" className="pop-up-dialog">
        <div className="pop-up-dialog__header">
          {headerText && (
            <div
              data-testid="pop-up-dialog-header"
              className="pop-up-dialog__header-text"
            >
              {headerText}
            </div>
          )}
          <div className="pop-up-dialog__header-close">
            <Tooltip template={<TextTooltipTemplate text="Close" />}>
              <Close data-testid="pop-up-close-btn" onClick={closePopUp} />
            </Tooltip>
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('overlay_container')
  )
}

PopUpDialog.defaultProps = {
  className: '',
  customPosition: {},
  headerText: ''
}

PopUpDialog.propTypes = {
  className: PropTypes.string,
  closePopUp: PropTypes.func.isRequired,
  customPosition: POP_UP_CUSTOM_POSITION,
  headerText: PropTypes.string
}

export default PopUpDialog
