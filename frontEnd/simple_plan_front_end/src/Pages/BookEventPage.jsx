import React from 'react'
import { Container, Segment, Grid, Header, Divider, Form , Checkbox, Button } from "semantic-ui-react"
import {Redirect, Link} from "react-router-dom"
import Cookies from 'universal-cookie';

export default function BookEventPage() {

    const [state,setState] = React.useState({
        username : '',
        email : '',
        date : '',
        peopleAttending : 0,
        venueBudget : 0,
        foodBudget : 0 ,
        soundsAndLightsBudget : 0 ,
        cameraAndVideoBudget : 0,
        estimate : 0
    });


    const calculateBudget = (venueBudget,foodBudget,soundsAndLightsBudget,cameraAndVideoBudget) => {
        
        return Number(venueBudget) + Number(foodBudget) + Number(soundsAndLightsBudget) + Number(cameraAndVideoBudget)

    }

    const handleInput = (event) => {

       
        setState({...state , [event.target.name] : event.target.value })
    
    }

    const handleBlur = (event) => {
        let total = calculateBudget(state.venueBudget,state.foodBudget,state.soundsAndLightsBudget,state.cameraAndVideoBudget);
        setState({...state , estimate : total})
    }

    const handleSubmit = () =>
    {

        const cookies = new Cookies();
        let username = cookies.get('username');
        fetch('http://localhost:8080/BookEvent', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username" : username,
                "email" : state.email,
                "date" : String(state.date),
                "peopleAttending" : state.peopleAttending,
                "venueBudget" : state.venueBudget,
                "foodBudget" : state.foodBudget,
                "soundsAndLightsBudget" : state.soundsAndLightsBudget,
                "cameraAndVideoBudget" : state.cameraAndVideoBudget,
                "estimate" : state.estimate
            }),
          })
          .then(response => 
                    //setState({...state, toLogin : true})
                    {
                        if(response.ok)
                        {
                            alert("Event Booking Requested, Our Staff will contact You Shortly")
                        }
                        else
                        {
                            alert("Error Registering , PLease Retry Booking ")
                        }
                    }
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
                            <Header as="h1">Book Event</Header>

                            <Divider />

                            <Form>
                                <Form.Field>
                                    <label>Select Date</label>
                                    <input 
                                        placeholder='date' 
                                        type = "date"
                                        name = 'date' 
                                        value = {state.date}  
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Number of People </label>
                                    <input 
                                        placeholder='# of People' 
                                        type = "number" 
                                        name = "peopleAttending" 
                                        value = {state.peopleAttending} 
                                        onChange = {(e) => {handleInput(e)}}
                                        email
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Venue Budget (LKR)</label>
                                    <input 
                                        placeholder='1200 LKR' 
                                        type = "number" 
                                        name = "venueBudget" 
                                        value = {state.venueBudget} 
                                        onChange = {(e) => {handleInput(e)}}
                                        onBlur = {handleBlur}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Food Budget (LKR)</label>
                                    <input 
                                        placeholder='1200 LKR' 
                                        type = "number" 
                                        name = "foodBudget" 
                                        value = {state.foodBudget} 
                                        onBlur = {handleBlur}
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Sounds and Lights Budget (LKR)</label>
                                    <input 
                                        placeholder='1200 LKR' 
                                        type = "number" 
                                        name = "soundsAndLightsBudget" 
                                        value = {state.soundsAndLightsBudget} 
                                        onBlur = {handleBlur}
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Camera and Video Budget (LKR)</label>
                                    <input 
                                        placeholder='1200 LKR' 
                                        type = "number" 
                                        name = "cameraAndVideoBudget" 
                                        onBlur = {handleBlur}
                                        value = {state.cameraAndVideoBudget} 
                                        onChange = {(e) => {handleInput(e)}}
                                        required
                                    />
                                </Form.Field>
                                
                                    <Header >Net Estimate under {state.estimate} LKR</Header>
                                <br/>
                                <Button type='submit' primary fluid onClick = {handleSubmit}>Request Booking</Button>
                                <br/>
                                <Link to = "/"><Button secondary fluid> Back </Button></Link>
                                <br/>
                                <br/>
                                <br/>
                                {state.toLogin ? <Redirect to = "/" /> : <></>}
                            </Form>

                        </Segment>


                    </Grid.Column>
                    <Grid.Column width="6">  
                            <img src = "https://images.unsplash.com/photo-1489513691500-41ef4acdb665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" style = {{height:"100%",objectFit:"cover"}} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}
