import React from 'react'
import { Container, Segment, Grid, Header, Divider, Form , Checkbox, Button } from "semantic-ui-react"
import {Redirect} from "react-router-dom"

export default function SignUpPage() {

    const [state,setState] = React.useState({
        username : '',
        password : '',
        password2 : '',
        email : '',
        toLogin : false
    });

    const handleInput = (event) => {
        setState({...state , [event.target.name] : event.target.value})
    }

    const handleSubmit = () =>
    {
        fetch('http://localhost:8080/signUp', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": state.username,
                "password": state.password,
                "email": state.email
            }),
          })
          .then(response => 
                    setState({...state, toLogin : true})
                    
                )
          .catch((error) => {
            console.error('Error:', error);
            alert("Please Re-enter Details")
          });
        
    }

    return (
       
            <Grid style = {{marginTop:"5vh"}}>
                <Grid.Row>
                    <Grid.Column width="10">
                        <Segment textAlign="left" style = {{height:"100%"}}>
                            <Header as="h1">Sign Up</Header>

                            <Divider />

                            <Form>
                                <Form.Field>
                                    <label>Username</label>
                                    <input 
                                        placeholder='Username' 
                                        name = 'username' 
                                        value = {state.username}  
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>email</label>
                                    <input 
                                        placeholder='password' 
                                        type = "email" 
                                        name = "email" 
                                        value = {state.email} 
                                        onChange = {(e) => {handleInput(e)}}
                                        email
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input 
                                        placeholder='password' 
                                        type = "password" 
                                        name = "password" 
                                        value = {state.password} 
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Re-enter Password</label>
                                    <input 
                                        placeholder='password' 
                                        type = "password" 
                                        name = "password2"  
                                        value = {state.password2} 
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                
                                <br/>
                                <Button type='submit' primary fluid onClick = {handleSubmit}>SignUp</Button>
                                <br/>
                                <br/>
                                <br/>
                                {state.toLogin ? <Redirect to = "/" /> : <></>}
                            </Form>

                        </Segment>


                    </Grid.Column>
                    <Grid.Column width="6">  
                            <img src = "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" style = {{height:"100%",objectFit:"cover"}} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
     
    )
}
