import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [{ id: 1, msg: "Hello How  r?" }, {
                id: 2, msg: "What is your Name"
            }],
            replies: [{
                commentId: 1, replyMsg: "I am Fine", id: 1
            }, {
                commentId: 1, replyMsg: "Thanks", id: 2
            },

            ],
            values: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.AddReply = this.AddReply.bind(this);
    }
    handleChange(e, comentId) {

        this.state.values[e.currentTarget.name] = e.target.value;

    }
    AddReply(e, commentId) {
        const _this = this;
        const getValue = this.state.values[commentId];

        let tempReplies = this.state.replies.concat({
            commentId: commentId, replyMsg: getValue
        });
        this.state.values[commentId] = "";
        this.setState({
            replies: tempReplies,
            values: []
        }, () => {

        })

    }
    render() {
        const _this = this
        const comentDiv = this.state.comments.map(comment => {
            const replyDiv = this.state.replies.filter(reply => {
                return reply.commentId === comment.id;
            })
            return (<React.Fragment>
                <div>
                    {comment.msg}
                </div>
                {
                    replyDiv.map(replyDiv => {
                        return (<div>{replyDiv.replyMsg}</div>)
                    })
                }
                <input type="text" placeholder="Add Reply" name={comment.id} onChange={(e => {
                    _this.handleChange(e, comment.id)
                })} id={comment.id}></input>
                <button type="button" value="Add Test" onClick={(e => {
                    _this.AddReply(e, comment.id)
                })} > Post</button>
                <br></br>
            </React.Fragment>)
        })
        return (
            <div>
                {comentDiv}
            </div>
        );
    }
}

export default Test;