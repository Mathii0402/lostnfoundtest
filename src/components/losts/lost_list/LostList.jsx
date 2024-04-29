import React from "react";
import ExpenseItem from "../lost_item/Lostitem";
import './Lostlist.css';
import icon from "../../img/search.gif"
const Lostlist = (props) => {
  const decoded = props.userdata;
 
  const {items} = props;
 
    if (items.length === 0 || !items) {
     return (
        <h2 className="lost_list__fallback"><img className="ico"src={icon}></img></h2>
     );
    }

   return (
        <ul className="lost_list">
                  <div  className="lost-item-1">
                    <h2 >  Name</h2>
                    <h2>Obj Id</h2>
                    <h2>Lost Object</h2>
                    <h2>About Object</h2>
                     {/* <h2>Date of Lost</h2> */}
                    <h2>Email</h2> 
                    <h2>Visited Place</h2>
                    <h2>Image</h2>
                    <h2>Status</h2>
                  </div>
            {
                items.map(each_expense => (
                
                    <ExpenseItem
                        key={each_expense?._id}
                        objid = {each_expense?.objid}
                        date={each_expense.date}
                        title={each_expense.title}
                        amount={each_expense.amount}
                        desc ={each_expense.desc}
                        name = {each_expense.name}
                        place = {each_expense.place}
                        image = {each_expense.image}
                        userdata={decoded} />
                        
                ))
              
            }
        </ul>
    )
  }

  export default Lostlist;