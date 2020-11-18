import React from 'react'
import { connect } from 'react-redux'
import MessageTile from './MessageTile.js'
import { Menu, Input, Segment, Grid, Dropdown, Header} from 'semantic-ui-react'

class MessageContainer extends React.Component {

    renderMessageTile = () => {
        if (this.props.user.received_messages !== 0){
            return this.props.user.received_messages.map(messageObj => {
                return <Segment style={{backgroundColor: '#EBAE34'}}><MessageTile message={messageObj}/></Segment>
            })
        } else {
            return "You have no messages"
        }
    }


    render(){
        return (
            <div>
                {this.renderMessageTile()}
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
   
}

export default connect(mapStateToProps, null)(MessageContainer);