import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import emailjs from "@emailjs/browser";
import Axios from "axios";
import "./Founddialogue.css";


export default function AlertDialog(props) {
  const decoded = props.userdata;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  
  const   handleClickOpen = () => {
    setOpen(open => !open)
    console.log(open);
 
  };
  useEffect(() => {
    console.log(open); // This will log the updated value of open after it's been set to true
  }, [open]);
  const handleClickOpen2 = () => {
    setOpen2(true);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const [enteredName, setEnteredName] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredPlace, setEnteredPlace] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredObjId, setEnteredObjId] = useState("");

  const onNameChangehandler = (event) => setEnteredName(event.target.value);
  const onNumberChangehandler = (event) => setEnteredNumber(decoded);
  const onPlaceChangehandler = (event) => setEnteredPlace(event.target.value);
  const onAddressChangehandler = (event) => setEnteredAddress(event.target.value);
  const onObjIdChangehandler = (event) => setEnteredObjId(event.target.value);

  const onFormSubmit = (event) => {
    event.preventDefault();
    
    const found_details = {
      name: enteredName,
      objid: enteredObjId,
      number: enteredNumber,
      place: enteredPlace,
      address: enteredAddress,
    };

    Axios.get(
      `http://localhost:3002/api/v1/lostobject/${found_details.objid}`
    ).then((res) => {
     
      var templateParams = {
        user_email: res.data.data[0].amount,
        username: res.data.data[0].name,
        obj: res.data.data[0].desc,
        founder_name: found_details.name,
        founder_email: found_details.number,
        founded_place: found_details.place,
        founder_address: found_details.address,
      };

      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_PUBLIC_KEY,
          
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
        
    });
    Axios.post(
      "http://localhost:3002/api/v1/found",
      found_details
    )
      .then((res) => console.log("posted", res))
      .catch((err) => console.log("errorr", err));

    setEnteredName("");
    setEnteredAddress("");
    setEnteredPlace("");
    setEnteredNumber("");
    setEnteredObjId("");
    setOpen2(false);
    };

  return (
    <>
      <div className="found">
        {" "}
        <button
          id="btnn"
          style={{ background: props.color }}
         disabled={props.disabled}
          onClick={handleClickOpen}
        >
          {props.text}
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#706F6F",
            color: "white",
            
            borderRadius: 20,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "monospace" }}>
          Have you found the object ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="found">
            {" "}
            <button onClick={handleClose}>Close</button>
            <button onClick={handleClickOpen2} autoFocus>
              Found?
            </button>
          </div>
        </DialogActions>
      </Dialog>
      {/* -------------- */}
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#706F6F",
            color: "white",
            width: "550px",

            borderRadius: 20,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "monospace" }}>
          {"Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="new-losts__controls">
              <div className="new-losts__control">
                <label>Name</label>
                <input
                  id="name"
                  label="Name"
                  type="text"
                  value={enteredName}
                  onChange={onNameChangehandler}
                />
              </div>
              <div className="new-losts__control">
                <label>Object ID</label>
                <input
                  value={enteredObjId}
                  onChange={onObjIdChangehandler}
                  id="objid"
                  label="Lost Object Id"
                  type="text"
                />
              </div>
              <div className="new-losts__control">
                <label>Email</label>
                <input
                  value={decoded?decoded?.email:"h"}
                  onChange={onNumberChangehandler}
                  id="number"
                  label="Mobile number"
                  type="email"
                  readOnly
                />
              </div>
              <div className="new-losts__control">
                <label>Place</label>
                <input
                  value={enteredPlace}
                  onChange={onPlaceChangehandler}
                  id="placefound"
                  label="Place of Found"
                  type="text"
                />
              </div>

              <div className="new-losts__control">
                <label>Address</label>
                <input
                  id="address"
                  label="Address"
                  type="text"
                  required
                  value={enteredAddress}
                  onChange={onAddressChangehandler}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="found">
            {" "}
            <button onClick={handleClose}>Close</button>
            <button onClick={onFormSubmit} autoFocus>
              Submit
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
