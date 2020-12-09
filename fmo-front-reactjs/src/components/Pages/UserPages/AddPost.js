import React, { Component } from "react";
import "./Posts.css";

import AddDocForm from "../../Forms/AddDocForm";

import sendHttpRequest from "../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import { connect } from "react-redux";

class AddPost extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            teamId : window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            inputs : {
                title : {type : "text", value : "", placeholder : "Title of the new post", errors : []},
                content : {type : "text", value : "", placeholder : "Content", errors : []}
            }
        };
    }

    componentDidMount() {
        if(this.state.teamId === "posts") {
            this.setState({
                teamId : null
            });
        }
    }
    
    submitAddPost(formData) {
        console.log("ADDING NEW POST");
        const req = {
            token : this.props.auth.token,
            teamId : this.state.teamId,
            ...formData
        };
        sendHttpRequest('POST', "/api/user/add-post", req)
            .then(responseData => {
                if(!responseData.success) {
                    ToastsStore.error(`${responseData.message}`);
                } else {
                    window.location.reload();
                }
            })
            .catch(err => {
                ToastsStore.error("Server error");
                console.log(err, err.data);
            });
    }

    render() {
        return (

                <div>
                    <AddDocForm 
                        title="Add New Post" 
                        containerStyle="article-recent"
                        inputs={this.state.inputs}
                        onSubmitForm={(formData) => this.submitAddPost(formData)}
                        style={{marginBottom: "2em", backgroundColor : "rgba(15, 15, 15, 0.03)"}}
                        />
                    <ToastsContainer store={ToastsStore}/>
                 </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddPost);