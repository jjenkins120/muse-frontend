import React from 'react'
import { connect } from 'react-redux'

class EditUser extends React.Component {
    
    render(){
        return(
            <div>
                Edit User
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);