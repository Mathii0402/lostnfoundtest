import React, { useState,useRef } from "react";
import Axios from "axios";
import "./LostItem.css";

import Card from "../../ui/Card";
import AlertDialog from "../../founddialogue/Founddialogue";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

const Lostitem = (props = {}) => {
  const decoded = props.userdata;
  const [color, setColor] = useState();
  const [text, setText] = useState("Found?🔎");
  const [styling, setstyling] = useState("none");
  const [disable, setdisable] = useState(false);
  const { date, title, amount, name, desc, place, objid,image } = props;
  const [datas, setdatas] = useState({});
  const [showImage,setShowImage] = useState(false);


  const toggleImage= () =>
  {
      setShowImage(!showImage);
  }


  const apicall = () => {
    Axios.get(
      `http://localhost:3002/api/v1/object/${objid}`

    ).then((res) => {
      if(res.data.data.length > 0 ){
        console.log(res.data.data,"data");
      var oid = res.data.data[0].objid;
      console.log(objid,"huhuuh");
      if(typeof(res.data.data[0].objid)!=undefined) oid=res.data.data[0].objid;
      
      if (oid == objid) {
        setColor("green");
        setText("Founded !");
        
        let ans = res.data.data[0];
      
        
        setdatas(ans);
        setdisable(true);
        setstyling("content");
      }}
    });
  };


  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      background: 'rgba(59, 58, 58, 0.95)',
     
      borderRadius:'16px',
      fontFamily:"monospace",
      color: "white",
      display: `${styling}`,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    
    },
  }));
  useEffect(() => {
    apicall();
  }, []);
  return (
    <Card>
      <HtmlTooltip
        title={
          <React.Fragment>
 
            <h3>Object Founded Person's Details</h3>
            <p>Name:{datas.name}</p>
            <p>Email:{datas.number}</p>
            <p>Place:{datas.place}</p>
            <p>Address:{datas.address}</p>
          </React.Fragment>
        }
      >
        <div className="lost-item" onClick={toggleImage}>
          <div className="inline">
            <div className="">
              <label htmlFor="">Name:</label>
            </div>
            <div>
              <h2> <pre>{name}</pre> </h2>
            </div>
          </div>
          <div className="inline">
            <div>
              <label htmlFor="">Obj Id:</label>
            </div>
            <div>
              <h2> <pre>{objid}</pre> </h2>
            </div>
          </div>
          <div className="inline">
            <div>
              <label htmlFor="">Lost object:</label>
            </div>
            <div>
              <h2> <pre>{desc}</pre> </h2>
           
            </div>
          </div>
          <div className="inline">
            <div>
              <label htmlFor="">Desc:</label>
            </div>
            <div>
              <h2> <pre>{title}</pre> </h2>
            </div>
          </div>
          {/* <div className="inline">
            <div>
              <label htmlFor="">Lost Date:</label>
            </div>
            <div>
              <h2> {date} </h2>
            </div>
          </div> */}
          <div className="inline">
            <div>
              <label>Email:</label>
            </div>
            <div>
              <h2> <pre>{amount} </pre></h2>
            </div>
          </div>
          <div className="inline">
            <div>
              <label htmlFor="">Place:</label>
            </div>
            <div>
              <h2>  {place} </h2>
            </div>
          </div>
          <div className="inline">
          <div>
              <label htmlFor="">Image:</label>
            </div>
            <div >{ <img src={`http://localhost:3002/uploads/${image}`} style={{maxWidth:"150px" ,maxHeight:"80px"}} alt="" />}</div>
            
          </div>

          <div className="inline">
            
            <AlertDialog color={color} userdata={decoded} disabled={disable} text={text} />
          </div>
          
        </div>
      </HtmlTooltip>
    </Card>
  );
};

export default Lostitem;
