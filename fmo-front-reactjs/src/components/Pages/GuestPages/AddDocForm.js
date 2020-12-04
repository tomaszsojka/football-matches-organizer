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
        // let inputNames = this.props.inputs
        //     .map((input, i) => input.name)
        //     .reduce( (current, item) => {
        //     current[item] = "";
        //     return current;
        //   }, {});

        let inputNames = Object.keys(this.props.inputs);
           console.log(inputNames);
        this.state = {
            errors: [],
            ...this.props.inputs,
            inputNames
        };
        console.log(this.state);
    }

    showValidationErr(name, msg) {
        this.setState((prevState) => ({
                [name] : {
                    ...prevState[name],
                    errors : [
                        ...prevState[name].errors,
                        msg
                    ]
                }
            })
        );
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            return {
                [elm] : {
                    ...prevState[elm],
                    errors: newArr
                }
            };
        });
    }

    onInputChange(e, name) {
        this.setState({
            [name] : {
                ...this.state[name],
                value : e.target.value
            }
        });
        this.clearValidationErr(`${name}`);
    }

    onSubmitForm() {
        let isError = false;
        // for(let propName in this.state.inputNames) {
        //     if(this.state[propName] === "") {
        //         this.showValidationErr(propName, `${propName} cannot be empty`);
        //         isError = true
        //     }
        // }
        for(let propName in this.state) {
            if(this.state[propName].value === "") {
                this.showValidationErr(propName, `${propName} cannot be empty`);
                isError = true
            }else if(this.state[propName].type ==="email" && this.state[propName].value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)==null) {
                this.showValidationErr(propName, `${propName} is not valid`);
                isError = true
            }
        }

        if(!isError) {
            this.props.onSubmitForm();
        }

    }

    render() {
        return (
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    {this.props.title}
                </div>
                <div className="flex box">

                    {Object.values(this.props.inputs).map((input, i) =>
                    <div key={i} className="flex inputGroup">
                        <label htmlFor={`${this.state.inputNames[i]}`}>{this.state.inputNames[i]}</label>
                        <input
                            type={`${input.type}`}
                            name={`${this.state.inputNames[i]}`}
                            className="formInput"
                            required
                            placeholder={`${input.placeholder}`}
                            onChange={(e) => this.onInputChange(e, this.state.inputNames[i])}
                        />
                        <small className="passingError">{ this.state[this.state.inputNames[i]].errors[0] }</small>
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