import React from 'react'
import {Grid,Segment,Form,Button,Header} from 'semantic-ui-react'
import {Redirect} from "react-router-dom"
import {Link} from 'react-router-dom'

import Cookies from 'universal-cookie';

export default function LoginPage() {

    const cookies = new Cookies();

    const [state,setState] = React.useState({username:'',password:'', loggedIn : false})
    
    const handleInput = (event) => {
        setState({...state , [event.target.name] : event.target.value})
    }

    const handleSubmit = () =>
    {


        fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": state.username,
                "password": state.password,
            }),
          })
          .then(response => 
            {
                console.log(response,state)
                setState({...state, loggedIn : true})

                
                cookies.set('username', state.username, { path: '/' });

            }
                    
                    
                )
          .catch((error) => {
            console.error('Error:', error);
            alert("Please Re-enter Details")
          });
        
    }


    return (
       
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <img src = "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" style = {{height:"30vh",width:"100%" ,objectFit:"cover" , marginTop:"2vh"}} />
                    </Grid.Column>
                    <Grid.Column width = "6" style = {{marginTop:"2vh"}}>
                        <Header as = "h4" style= {{margin:"0px"}}>Welcome To</Header>
                        <Header as = "h1"  style= {{margin:"0px", fontSize : "5vh"}} >Simple Plan</Header>
                        <Header as = "h3"  style= {{margin:"0px"}}>Event Management Company</Header>
                        <br/>
                        <Link to = "/BookEvent"><Button positive disabled = {!(state.loggedIn)}>Book Your Event Now </Button></Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                        <Grid.Column width = "8">
                            <Form >
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
                                
                                    
                                    <br/>
                                        <Button type='submit' primary fluid onClick = {handleSubmit}>Sign In</Button>
                                    <br/>
                                    
                                    
                                    <Link to="/SignUp"> Dont Have An Account ? Click Here</Link>
                                    
                                </Form>
                        </Grid.Column>
                        <Grid.Column width = "8">
                            <img src = "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" style = {{height:"30vh" ,objectFit:"cover",width:"100%"}} />
                        </Grid.Column>
                </Grid.Row>
               
            </Grid>
            
       
    )
}
