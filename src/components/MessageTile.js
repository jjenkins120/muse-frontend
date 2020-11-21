import React from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Segment, Header, Feed, Radio, Button, Form, Grid, Divider} from 'semantic-ui-react'
import moment from 'moment'
import toaster from 'toasted-notes'
import { fetchMessagesSuccess } from '../actions/messages'
import { fetchAllUsersSuccess } from '../actions/allUsers'

class MessageTile extends React.Component {
    
    state = {
        replyClick: false, 
        formValue: '',
    }

    sendMessageFetch = () => {
        fetch('http://localhost:3000/messages')
        .then(resp => resp.json())
        .then(messages => {
            this.props.fetchMessagesSuccess(messages)
        })
    }

    // sendMessageDelFetch = () => {
    //     fetch('http://localhost:3000/messages')
    //     .then(resp => resp.json())
    //     .then(messages => {
    //         this.props.fetchMessagesSuccess(messages)
    //     })
    //     fetch('http://localhost:3000/users')
    //     .then(resp => resp.json())
    //     .then(users => {
    //         this.props.fetchAllUsersSuccess(users)
    //     })
    // }

    handleRepClick = (id) => {
        this.setState({
            replyClick: true
        })
        const updatedMessage = {
            read: true, 
        }
        const patchReqObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMessage)
        }
        fetch(`http://localhost:3000/messages/${id}`, patchReqObj)
        .then(resp => resp.json())
        .then(updateMessage => {
            // revisit what to do here
            // display something to show that the message is replied to 
            this.sendMessageFetch()
            console.log(updateMessage)
        }) 
    }

    handleSendClick = (id) => {
        const updatedMessage = {
            replied: true, 
        }
        const patchReqObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMessage)
        }
        fetch(`http://localhost:3000/messages/${id}`, patchReqObj)
        .then(resp => resp.json())
        .then(updateMessage => {
            // revisit what to do here
            // display something to show that the message is replied to 
            this.sendMessageFetch()
            console.log(updateMessage)
        }) 
        const newMessage = {
            sender_id: this.props.user.id,  
            recipient_id: this.props.message.sender_id, 
            content: this.state.formValue, 
            read: false, 
            replied: false
        }
        const postReqObj = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        }
        fetch(`http://localhost:3000/messages`, postReqObj)
        .then(resp => resp.json())
        .then(newMessage => {
            console.log(newMessage)
            // revisit what to do here
            toaster.notify("Your message was successfully sent!")
            this.setState({
                replyClick: false,
                formValue: ''
            })
        }) 
    }

    // handleDelClick = (id) => {
    //     const delReqObj = {
    //         method: 'DELETE'
    //     }
    //     fetch(`http://localhost:3000/messages/${id}`, delReqObj)
    //     .then(resp => resp.json())
    //     .then(() => {
    //         this.sendMessageDelFetch()
    //         toaster.notify("Your message was deleted")
    //     }) 
    // }
    
    replyForm = () => {
      return this.state.replyClick ? <div><Grid.Row><Form><Form.Group widths='equal'>
        <Form.Input fluid placeholder='Write Response' name='response' onChange={(event)=> this.setState({formValue: event.target.value})}/>
        </Form.Group></Form></Grid.Row><Grid.Row><Icon name='send' onClick={() => this.handleSendClick(this.props.message.id)}/><Icon name='delete' onClick={()=>this.setState({replyClick: false, formValue: ''})}/></Grid.Row></div> : null
    }

    render(){
        const messageToRender = this.props.messages.find(messageObj => messageObj.id === this.props.message.id)
        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={messageToRender.sender.image_url} circular size='tiny' style={{margin: 'auto'}}/>{messageToRender.sender.first_name} {messageToRender.sender.last_name}
                    </Grid.Column>
                    <Grid.Column width={7} style={{margin: 'auto'}}>
                    <Grid.Row>
                        {messageToRender.read ? <Segment style={{color:'black'}}>{messageToRender.content}</Segment> : <Segment style={{backgroundColor: 'yellow', color:'black'}}>{messageToRender.content}</Segment> }
                    </Grid.Row>  
                    <Grid.Row style={{margin: 'auto', marginTop: '10px'}}>  
                        <Icon name='reply' onClick={() => this.handleRepClick(this.props.message.id)}/>
                        {/* <Icon name='delete' onClick={() => this.handleDelClick(this.props.message.id)}/> */}
                        <br/>
                        {messageToRender.replied ? "Replied Already" : "Not Yet Replied" }
                    </Grid.Row> 
                    {this.replyForm()}   
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
      user: state.user,
      messages: state.messages
    }
  }
  
const mapDispatchToProps = {
   fetchMessagesSuccess, 
   fetchAllUsersSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTile);