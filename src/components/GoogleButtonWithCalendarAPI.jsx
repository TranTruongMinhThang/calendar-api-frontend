import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';


function GoogleButtonWithCalendarAPI() {

    const login = useGoogleLogin({
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/calendar",
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);

            const { code } = tokenResponse;
            axios
                .post('/api/create-tokens', { code })
                .then(response => {
                    console.log(response.data);
                    setSignedIn(true);
                })
                .catch(error => console.log(error))

        },
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(summary, description, location, startDateTime, endDateTime);
        axios
            .post('/api/create-event', { 
                summary, 
                description, 
                location, 
                startDateTime, 
                endDateTime 
            }).then(response => {
                console.log(response.data);
                setSignedIn(true);
            })
            .catch(error => console.log(error.message))
    }

    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [signedIn, setSignedIn] = useState(false);

    return (
        <div>
            {!signedIn ?
                (<button
                    onClick={() => login()}
                >
                    Login With Google
                </button>
                ) : (
                    
                    <div>
                        
                        <br />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='summary'>Summary</label>
                            <br />
                            <input
                                type='text'
                                id='summary'
                                value={summary}
                                onChange={e => setSummary(e.target.value)}
                            />
                            <label htmlFor='description'>Description</label>
                            <br />
                            <textarea
                                id='description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <label htmlFor='location'>Location</label>
                            <br />
                            <input
                                type='text'
                                id='location'
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                            <label htmlFor='startDateTime'>Start Time</label>
                            <br />
                            <input
                                type='datetime-local'
                                id='startDateTime'
                                value={startDateTime}
                                onChange={e => setStartDateTime(e.target.value)}
                            />
                            <label htmlFor='endDateTime'>End Time</label>
                            <br />
                            <input
                                type='datetime-local'
                                id='endDateTime'
                                value={endDateTime}
                                onChange={e => setEndDateTime(e.target.value)}
                            />
                            <br />
                            <button type='submit'>Create Event</button>
                        </form>
                        
                    </div>
                    
                )}
        </div>


    );

}

export default GoogleButtonWithCalendarAPI;