import React from "react";

/**
 * class is a unified form for user login or adding documents to db like teams or users
 */
class AddDocForm extends React.Component {
//TODO if we have time password strength bar
    constructor(props) {
        super(props);

  
        // map to {"inputname1", "inputname2"}
        // and then reduce to {inputname1 : "", inputname2 : ""}
        // let inputNames = this.props.inputs
        //     .map((input, i) => input.name)
        //     .reduce( (current, item) => {
        //     current[item] = "";
        //     return current;
        //   }, {});

        let inputNames = Object.keys(this.props.inputs);
        this.state = {
            errors: [],
            ...this.props.inputs,
            inputNames
        };
    }

    showValidationErr(propName, msg) {
        this.setState((prevState) => ({
                [propName] : {
                    ...prevState[propName],
                    errors : [
                        ...prevState[propName].errors,
                        msg
                    ]
                }
            })
        );
    }

    clearValidationErr(propName) {
        this.setState((prevState) => ({
                [propName] : {
                    ...prevState[propName],
                    errors: []
                }
            })
        );
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

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.onSubmitForm();
          }
    }

    onSubmitForm() {
        let isError = false;
        for(let propName in this.state) {
            if(this.state[propName].value === "") {
                this.showValidationErr(propName, `${propName} cannot be empty`);
                isError = true
            }else if(this.state[propName].type ==="email" && this.state[propName].value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)==null) {
                this.showValidationErr(propName, `This is not a valid email address`);
                isError = true
            }
        }

        if(!isError) {
            //inputNames array to {inputName : "", inputName2 : ""}
            let formResponse = this.state.inputNames
                .reduce( (current, item) => {
                        current[item] = "";
                        return current;
                      }, {}
                );

            // values of inputs assigned to propertyNames
            for(let inName in formResponse) {
                formResponse[inName] = this.state[inName].value;
            }
            this.props.onSubmitForm(formResponse);
        }
    }

    render() {
        return (
            <div 
            onKeyDown={(e) => this.onKeyDown(e)} 
            tabIndex="0"
            className={this.props.containerStyle ? this.props.containerStyle : "boxContainer"} 
            style={this.props.style ? this.props.style : {}}
            >
                <div className="boxContainer-header bottomBorder">
                    {this.props.title}
                </div>
                <div className="flex formBox">
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
                        onClick={() => this.onSubmitForm()}>
                            {this.props.title.substring(0, this.props.title.indexOf(' ')) 
                            ? this.props.title.substring(0, this.props.title.indexOf(' ')) 
                            : this.props.title}
                            </button>
                </div>
            </div>
        );
    }
}

export default AddDocForm;