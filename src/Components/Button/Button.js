import React from 'react';
import PropTypes from 'prop-types';

const button = (props) => {
    return (
        <button className={props.classes}
            onClick={props.click}
            >{props.name}</button>
    )
}

button.propTypes = {
    name: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired
};

export default button;