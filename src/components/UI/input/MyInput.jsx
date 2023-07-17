import React from "react";
import classes from './MyInput.module.css'

const MyInput =  function (props) {

    return (
        <input className={classes.MyInput} {...props} />
    )
}

export default MyInput;