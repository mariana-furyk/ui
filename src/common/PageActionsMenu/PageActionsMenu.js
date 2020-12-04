import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PageActionsMenu = ({ actionsMenu }) => {
  return actionsMenu
    ? actionsMenu.map((actionMenuItem, index) =>
        actionMenuItem.type === 'link' ? (
          <div
            data-testid="actions-link"
            className="page-actions-container"
            key={Date.now() + index}
          >
            <Link className="btn_secondary btn_small" to={actionMenuItem.link}>
              {actionMenuItem.linkTitle}
            </Link>
          </div>
        ) : (
          <div
            data-testid="actions-button"
            className="page-actions-container"
            key={Date.now() + index}
          >
            <button
              className="btn_secondary btn_small btn_register"
              onClick={actionMenuItem.onClick}
            >
              {actionMenuItem.buttonTitle}
            </button>
          </div>
        )
      )
    : null
}

PageActionsMenu.defaultProps = {
  actionsMenu: []
}

PageActionsMenu.propTypes = {
  actionsMenu: PropTypes.arrayOf(PropTypes.shape({}))
}

export default PageActionsMenu
