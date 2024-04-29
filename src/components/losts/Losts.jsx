import "./Losts.css";
import Card from "../ui/Card";
import Lostlist from "./lost_list/LostList";

const Losts = (props) => {
  const { expenses = [] } = props;
  const decoded = props.userdata;
  return (
    <Card className="expenses">
      <Lostlist items={expenses} userdata={decoded} />
    </Card>
  );
};

export default Losts;
