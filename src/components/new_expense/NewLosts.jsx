import React, { useState } from "react";
import NewExpenseForm from "./new_expense_form/NewLostsForm";
import './NewLosts.css';

const NewLosts = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const startEditing = () => setIsEditing(true);
    const stopEditing = () => setIsEditing(false);

    const onSaveNewExpense = (expense) => {
      const new_expense_data = {
          ...expense,
          id: Math.random.toString(),
      }
      console.log('onSaveNewExpense', new_expense_data);
      props.onAddNewExpense(new_expense_data);
    }
    return (
        <div className="new-losts">
            {!isEditing && <button onClick={startEditing}>Add Lost</button>}
            {isEditing && <NewExpenseForm  onSave={onSaveNewExpense} onCancel={stopEditing}/>}
        </div>
    );
}

export default NewLosts;