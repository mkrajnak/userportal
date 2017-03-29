import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { openEditTemplate } from './actions'

const EditTemplateButton = ({ name, toggleEditTemplate }) => (
    <div>
      <button
        width='100%'
        type='button'
        className='btn btn-primary'
        onClick={toggleEditTemplate}>
        <span className='pfincon pficon-edit' />
        {name}
      </button>
    </div>
  )

EditTemplateButton.propTypes = {
  name: PropTypes.string.isRequired,
  toggleEditTemplate: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    toggleEditTemplate: () =>
      dispatch(openEditTemplate()),
  })
)(EditTemplateButton)