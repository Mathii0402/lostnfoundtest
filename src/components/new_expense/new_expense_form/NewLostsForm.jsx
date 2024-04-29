import React, { useState } from "react";
import './NewLostsForm.css';
import Axios from "axios";


const NewExpenseForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredObj, setEnteredObj] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPlace, setEnteredPlace] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const onTitleChangehandler = (event) => setEnteredTitle(event.target.value);
    const onAmounChangehandler = (event) => setEnteredAmount(event.target.value);
    const onDateChangehandler = (event) => setEnteredDate(event.target.value);
    const onObjChangehandler = (event) => setEnteredObj(event.target.value);
    const onNameChangehandler = (event) => setEnteredName(event.target.value);
    const onPlaceChangehandler = (event) => setEnteredPlace(event.target.value);
    const onImageChangehandler = (event) => 
    {
        setSelectedImage(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const onFormSubmit = (event) => { 
        event.preventDefault();
       console.log(enteredObj);
        const new_expense = {

            title: enteredTitle,
            amount: enteredAmount,
            desc:enteredObj,
            name:enteredName,
            date: new Date(enteredDate).toDateString(),
            place:enteredPlace,
            image:selectedImage
        }
        
    //     Axios.post("https://lostnfound-api-backend.onrender.com/api/v1/expenses",
    //         new_expense
    // )
    //     .then(res=>console.log("posted",res)).catch(err=> console.log("cannot post",err));
        Axios.post("http://localhost:3002/api/v1/expenses",
            new_expense,{
                headers:{"Content-Type":"multipart/form-data"},
            }
    )
        .then(res=>console.log("posted",res)).catch(err=> console.log("cannot post",err));
        props.onSave(new_expense);
       
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        setEnteredObj("");
        setEnteredName("");
        setEnteredPlace("");
        setSelectedImage("");
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className="new-losts__controls">
           
                <div className="new-losts__control">
                    <label>Lost Object</label>
                    <input type="text" required value ={enteredObj} onChange={onObjChangehandler}/>
                </div>
                <div className="new-losts__control">
                    <label>Name</label>
                    <input type="text" required value ={enteredName} onChange={onNameChangehandler}/>
                </div>
                <div className="new-losts__control">
                    <label>Description</label>
                    <input type="text" required placeholder="describe about the object" value ={enteredTitle} onChange={onTitleChangehandler}/>
                </div>
                <div className="new-losts__control">
                    <label>Email</label>
                    <input type="email"  value={enteredAmount} onChange={onAmounChangehandler} />
                </div>
                <div className="new-losts__control">
                    <label>Date</label>
                    <input type="date" required min="2019-01-01" max="2025-01-01" value={enteredDate} onChange={onDateChangehandler}/>
                </div>
                <div className="new-losts__control">
                    <label>Visited Place</label>
                    <input type="text" required value={enteredPlace} onChange={onPlaceChangehandler}/>
                </div>
                <div className="new-losts__control">
                    <label>Image</label>
                    <input type="file" accept="image/*" onChange={onImageChangehandler} />
                </div>
            </div>
            <div className="new-losts__actions">
                <button onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Lost Items</button>
            </div>
        </form>
    )
}

export default NewExpenseForm;