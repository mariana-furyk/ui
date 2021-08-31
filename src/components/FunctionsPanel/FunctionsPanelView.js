import React from 'react'
import PropTypes from 'prop-types'

import Loader from '../../common/Loader/Loader'
import FunctionsPanelTitle from '../../elements/FunctionsPanelTitle/FunctionsPanelTitle'
import Accordion from '../../common/Accordion/Accordion'
import FunctionsPanelGeneral from '../../elements/FunctionsPanelGeneral/FunctionsPanelGeneral'
import FunctionsPanelCode from '../../elements/FunctionsPanelCode/FunctionsPanelCode'
import FunctionsPanelResources from '../../elements/FunctionsPanelResources/FunctionsPanelResources'
import FunctionsPanelEnvironmentVariables from '../../elements/FunctionsPanelEnvironmentVariables/FunctionsPanelEnvironmentVariables'
import Button from '../../common/Button/Button'
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import FunctionsPanelSecrets from '../../elements/FunctionsPanelSecrets/FunctionsPanelSecrets'
import { FUNCTION_PANEL_MODE } from '../../types'

import { ReactComponent as Arrow } from '../../images/arrow.svg'

import './functionsPanel.scss'

const FunctionsPanelView = ({
  closePanel,
  checkValidation,
  defaultData,
  error,
  handleSave,
  imageType,
  loading,
  match,
  mode,
  removeFunctionsError,
  setImageType,
  setValidation,
  validation
}) => {
  return (
    <div className="new-item-side-panel-container">
      <div className="functions-panel new-item-side-panel">
        {loading && <Loader />}
        <FunctionsPanelTitle closePanel={closePanel} />
        <div className="new-item-side-panel__body">
          <Accordion
            accordionClassName="new-item-side-panel__accordion"
            icon={<Arrow />}
            iconClassName="new-item-side-panel__expand-icon"
            openByDefault
          >
            <FunctionsPanelGeneral
              defaultData={defaultData}
              isNameValid={validation.isNameValid}
              setNameValid={setValidation}
            />
          </Accordion>
          <Accordion
            accordionClassName="new-item-side-panel__accordion"
            icon={<Arrow />}
            iconClassName="new-item-side-panel__expand-icon"
            openByDefault
          >
            <FunctionsPanelCode
              defaultData={defaultData}
              imageType={imageType}
              match={match}
              mode={mode}
              setImageType={setImageType}
              setValidation={setValidation}
              validation={validation}
            />
          </Accordion>
          <Accordion
            accordionClassName="new-item-side-panel__accordion"
            icon={<Arrow />}
            iconClassName="new-item-side-panel__expand-icon"
            openByDefault
          >
            <FunctionsPanelResources defaultData={defaultData} mode={mode} />
          </Accordion>
          <Accordion
            accordionClassName="new-item-side-panel__accordion"
            icon={<Arrow />}
            iconClassName="new-item-side-panel__expand-icon"
            openByDefault
          >
            <FunctionsPanelEnvironmentVariables />
          </Accordion>
          <Accordion
            accordionClassName="new-item-side-panel__accordion hidden"
            icon={<Arrow />}
            iconClassName="new-item-side-panel__expand-icon"
            openByDefault
          >
            <FunctionsPanelSecrets />
          </Accordion>
          <div className="new-item-side-panel__buttons-container">
            {error && (
              <ErrorMessage
                closeError={() => {
                  if (error) {
                    removeFunctionsError()
                  }
                }}
                message={error}
              />
            )}
            <Button
              className="btn_cancel"
              variant="label"
              label="Cancel"
              onClick={closePanel}
            />
            <Button
              className="btn_save"
              disabled={!checkValidation()}
              variant="tertiary"
              label="Save"
              onClick={() => handleSave()}
            />
            <Button
              variant="secondary"
              label="Deploy"
              onClick={() => handleSave(true)}
              disabled={!checkValidation()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

FunctionsPanelView.defaultProps = {
  defaultData: {},
  error: ''
}

FunctionsPanelView.propTypes = {
  closePanel: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
  defaultData: PropTypes.shape({}),
  error: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  mode: FUNCTION_PANEL_MODE.isRequired,
  removeFunctionsError: PropTypes.func.isRequired,
  setValidation: PropTypes.func.isRequired,
  validation: PropTypes.shape({})
}

export default FunctionsPanelView
