import React, { useState } from 'react';
import Card from '../UI/Card';
import ErrorModal from "../UI/ErrorModal";
import Button from '../UI/Button';
import  './AddUser.css';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const[error,setError]= useState();

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length===0|| enteredAge.trim().length===0 ) {
            setError({
                title:"Invalid Input" ,
                message:"please enter a  username and age",
            });
            return;
        }
    
        if (+enteredAge <1) {
            setError({
                title:"Invalid Input" ,
                message:"please enter a valid age(number) ",
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
        event.target.reset();
    };
    const errorHandler = () =>{
        setError(null);
    }

    return (
        <div>
            
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        
        <Card className="input">
            <form onSubmit={addUserHandler}>
                <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                />
                </div>
                <div>

                <label htmlFor="age">Age (Years)</label>
                <input
                    id="age"
                    type="number"
                    value={enteredAge}
                    onChange={ageChangeHandler}
                />
                </div>

                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </div>
    );
};

export default AddUser;
