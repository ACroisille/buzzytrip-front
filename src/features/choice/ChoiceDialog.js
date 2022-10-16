import React, { useState } from "react";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   TextField,
} from "@mui/material";
import { useAddChoiceMutation } from "./choiceApiSlice";

function ChoiceDialog() {
   const [open, setOpen] = useState(false);
   const [addChoice] = useAddChoiceMutation();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      addChoice({
         name: e.target["title"].value,
         description: e.target["description"].value,
         participant: 1,
      });
   };

   return (
      <div>
         <Button variant="contained" onClick={handleClickOpen}>
            Add Choice
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
               <DialogTitle>Choice</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     To subscribe to this website, please enter your email
                     address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                     autoFocus
                     margin="dense"
                     id="title"
                     label="Title"
                     type="text"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     autoFocus
                     margin="dense"
                     id="description"
                     label="Description"
                     type="text"
                     fullWidth
                     variant="standard"
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" onClick={handleClose}>
                     Ok
                  </Button>
               </DialogActions>
            </form>
         </Dialog>
      </div>
   );
}

export default ChoiceDialog;
