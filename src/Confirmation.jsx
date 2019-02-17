import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStoreStateToConfirmationProps } from './utils';
import { ROUTE_HOME } from './constants';

import './styles/confirmation.scss';

function Confirmation({ submitted }) {
  return (
    <section className="confirmation">
      {!submitted && <Redirect to={ROUTE_HOME} />}
      <h1 className="confirmation__heading">Thank You</h1>
    </section>
  );
}

Confirmation.propTypes = { submitted: PropTypes.bool };

export default connect(mapStoreStateToConfirmationProps)(Confirmation);
