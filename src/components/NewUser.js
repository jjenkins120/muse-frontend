import React from 'react'
import { connect } from 'react-redux'

class NewUser extends React.Component {
    
    render(){
        return(
            <div>
                New User page
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      
    }
  }
  
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);