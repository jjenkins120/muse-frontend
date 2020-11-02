import React from 'react'
import { Form, Grid, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/allPosts'

const options = [
    { key: 'v', text: 'Video', value: 'video' },
    { key: 'a', text: 'Audio', value: 'audio' },
    { key: 'i', text: 'Image', value: 'image', name:'category'},
  ]

class NewPost extends React.Component {
    state = {
        title:'', 
        description:'',
        link_url: '',
        post_id: null,
        user_id: this.props.user.id,
        likes: 0,
        category: '',
        value: 'no',
        inspiredBy: 'Which One?',
    }
    
    // handleChange = (e) => {
    //   const newPostInfo = {...this.state.postInfo,
    //     [e.target.name]: e.target.value 
    //   }
    //   this.setState({postInfo: newPostInfo})
    // }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value 
      }) 
    }

    // handleCatChange = (e) => {
    //   const newPostInfo = {...this.state.postInfo,
    //     [e.target.options.name]: e.target.options.value 
    //   }
    //   this.setState({postInfo: newPostInfo})
    // }

    handleBtnChange = (e, { value }) => this.setState({ value, inspiredBy: 'Which One?' })

    handleSubmit = (e) => {
      e.preventDefault()
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(this.state)
      } 
      fetch('http://localhost:3000/posts', reqObj)
      .then(resp => resp.json())
      .then(newPost => {
        this.props.addPost(newPost)
        this.props.history.push('/home')
        alert('New post added!')
      })
    }
  
    renderDropDown = () => {
       return <Dropdown text={this.state.inspiredBy} icon='' floating labeled button className='icon'><Dropdown.Menu><Dropdown.Header/>{this.renderDropdownChoices()}</Dropdown.Menu></Dropdown>
    }


    renderDropdownChoices = () => {
      return this.props.allPosts.map(postObj => {
           return <Dropdown.Item key={postObj.title} text={postObj.title} value={postObj.title} id={postObj.id} onClick={this.handleMenuClick}/>
        })
    }

    handleMenuClick = (e) => {
        this.setState({
            inspiredBy: e.target.text,
            post_id: e.target.id,
        })
        
    }

    render(){
        const { value } = this.state
        return (
          <div>
              <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Link Url' placeholder='Link Url' name='link_url' onChange={this.handleChange}/>
                        <Form.Input fluid label='Title' placeholder='Title' name='title' onChange={this.handleChange}/>
                        
                        <Form.TextArea label='Description' placeholder='Write your description here...' name='description' onChange={this.handleChange}/>
                        <Form.Select fluid label='Category' options={options} placeholder='Category'/>
                    </Form.Group>
                    <Form.Group inline>
                        <label>Is this inspired by other work?</label>
                        <Form.Radio
                            label='Yes'
                            value='yes'
                            checked={value === 'yes'}
                            onChange={this.handleBtnChange}
                        />
                        <Form.Radio
                            label='No'
                            value='no'
                            checked={value === 'no'}
                            onChange={this.handleBtnChange}
                        />
                        </Form.Group>
                        {this.state.value === 'yes' ? this.renderDropDown() : null }
                    <Button.Group>
                      <Form.Button primary>Submit</Form.Button>
                      <Button.Or />
                      <Link to={`/home`}><Button style={{ color: "white"}}>Wall</Button></Link>
                    </Button.Group>
                  </Form>
                </Grid.Column>
              </Grid >
          </div>
        );
    }
}    


    const mapStateToProps = (state) => {
        return { 
        user: state.user, 
        allPosts: state.allPosts
        }
    }
  
    const mapDispatchToProps = {
        addPost
    }

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);