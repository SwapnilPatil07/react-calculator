import React from 'react';
import classes from './Display.module.css';
import PropTypes from 'prop-types';

const display = (props) => {
    return (
        <span className={classes.Display} >{props.value}</span>
    )
}

display.propTypes = {
    value: PropTypes.string.isRequired
};

export default display;