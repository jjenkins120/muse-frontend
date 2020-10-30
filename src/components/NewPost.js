import React from 'react'
import { connect } from 'react-redux'

class NewPost extends React.Component {
    
    render(){
        return(
            <div>
                New Post page
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);