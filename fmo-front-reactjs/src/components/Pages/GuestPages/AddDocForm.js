import React from "react";
import "./GuestPage.css";

/**
 * class for register and adding another documents to db like teams
 */
class AddDocForm extends React.Component {
//TODO if we have time password strength bar
    constructor(props) {
        super(props);

  
        // map to {inputname1 : ""}, {inputname2 : ""}
        // and then reduce to {inputname1 : "", inputname2 : ""}
        let inputNames = this.props.inputs
            .map((input, i) => input.name)
            .reduce( (current, item) => {
            current[item] = "";
            return current;
          }, {});
        this.state = {
            ...inputNames,
            errors: [],
            inputNames
        };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
                errors: [
                    ...prevState.errors,
                    {elm, msg}
                ]
            })
        );
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onInputChange(e, name) {
        this.setState({
            [name] : e.target.value
        });
        this.clearValidationErr(`${name}`);
    }

    onSubmitForm() {
        let isError = false;
        for(let propName in this.state.inputNames) {
            if(this.state[propName] === "") {
                this.showValidationErr(propName, `${propName} cannot be empty`);
                isError = true
            }
        }

        if(!isError) {
            this.props.onSubmitForm();
        }

    }

    render() {

        let errors = this.state.inputNames;
        for(let propName in errors) {
                errors[propName] = "";
        }

        this.state.errors.forEach(err => {
            for(let propName in errors) {
                if(propName === err.elm) {
                    errors[propName] = err.msg;
                }
            }
        });
        console.log(errors);
        console.log(errors["input1"]);
        // console.log(errors.getOwnPropertyNames());

        return (
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    {this.props.title}
                </div>
                <div className="flex box">

                    {this.props.inputs.map((input, i) =>
                    <div key={i} className="flex inputGroup">
                        <label htmlFor={`${input.name}`}>{input.name}</label>
                        <input
                            type={`${input.type}`}
                            name={`${input.name}`}
                            className="formInput"
                            required
                            placeholder={`${input.placeholder}`}
                            onChange={(e) => this.onInputChange(e, input.name)}
                        />
                        <small className="passingError">{ errors[input.name] ? errors[input.name] : "" }</small>
                    </div>
                    )}
                    <button
                        type="button"
                        className="greenBtn formBtn"
                        onClick={() => this.onSubmitForm()}>{this.props.title}</button>
                </div>
            </div>
        );
    }
}

export default AddDocForm;