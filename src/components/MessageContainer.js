import React from 'react'
import { connect } from 'react-redux'
import MessageTile from './MessageTile.js'
import { Menu, Input, Segment, Grid, Dropdown, Header} from 'semantic-ui-react'

class MessageContainer extends React.Component {

    renderMessageTile = () => {
        if (this.props.user.received_messages !== 0){
            return this.props.user.received_messages.map(messageObj => {
                return <Segment style={{backgroundColor: '#36464F', color: 'white'}}><MessageTile message={messageObj}/></Segment>
            })
        } else {
            return "You have no messages"
        }
    }


    render(){
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
                    <Grid.Column style={{ width: 900, marginTop: 50 }} >
                        <Segment>
                        {this.renderMessageTile()}
                        </Segment>
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
   
}

export default connect(mapStateToProps, null)(MessageContainer);