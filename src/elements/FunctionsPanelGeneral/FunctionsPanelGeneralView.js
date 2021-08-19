import React from 'react'
import PropTypes from 'prop-types'

import FunctionsPanelSection from '../FunctionsPanelSection/FunctionsPanelSection'
import Input from '../../common/Input/Input'
import TextArea from '../../common/TextArea/TextArea'
import ChipCell from '../../common/ChipCell/ChipCell'

import './functionsPanelGeneral.scss'

const FunctionsPanelGeneralView = ({
  data,
  functionsStore,
  handleAddLabel,
  handleChangeLabels,
  handleNameChange,
  handleNameOnBlur,
  handleTagChange,
  handleTagOnBlur,
  isNameValid,
  setData,
  setNewFunctionDescription
}) => {
  const nameValidationTip = (
    <>
      <span>&bull; Valid characters: a-z, 0-9, -</span>
      <br />
      <span>&bull; Must begin and end with: a-z, 0-9</span>
      <br />
      <span>&bull; Length - max: 63</span>
    </>
  )

  return (
    <div className="functions-panel__item new-item-side-panel__item general">
      <FunctionsPanelSection title="General">
        <div className="general__required-info">
          <Input
            floatingLabel
            invalid={!isNameValid}
            invalidText="This field is invalid"
            label="Function Name"
            maxLength={63}
            onChange={handleNameChange}
            onBlur={handleNameOnBlur}
            required
            requiredText="This field is required"
            tip={nameValidationTip}
            type="text"
            value={data.name}
            wrapperClassName="name"
          />
          <Input
            floatingLabel
            label="Tag"
            onChange={handleTagChange}
            onBlur={handleTagOnBlur}
            placeholder="latest"
            type="text"
            value={data.tag}
            wrapperClassName="tag"
          />
        </div>
        <TextArea
          floatingLabel
          label="Description"
          onChange={description =>
            setData(state => ({
              ...state,
              description
            }))
          }
          onBlur={event => {
            if (
              functionsStore.newFunction.spec.description !== event.target.value
            ) {
              setNewFunctionDescription(event.target.value)
            }
          }}
          type="text"
          value={data.description}
          wrapperClassName="description"
        />
        <div className="general__labels-container">
          <div className="general__labels-text">Labels</div>
          <div className="general__labels-wrapper">
            <ChipCell
              addChip={handleAddLabel}
              className="general__labels-item"
              editChip={handleChangeLabels}
              elements={data.labels}
              isEditMode={true}
              removeChip={handleChangeLabels}
            />
          </div>
        </div>
      </FunctionsPanelSection>
    </div>
  )
}

FunctionsPanelGeneralView.propTypes = {
  data: PropTypes.shape({}).isRequired,
  functionsStore: PropTypes.shape({}).isRequired,
  handleAddLabel: PropTypes.func.isRequired,
  handleChangeLabels: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNameOnBlur: PropTypes.func.isRequired,
  handleTagChange: PropTypes.func.isRequired,
  handleTagOnBlur: PropTypes.func.isRequired,
  isNameValid: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setNewFunctionDescription: PropTypes.func.isRequired
}

export default FunctionsPanelGeneralView
