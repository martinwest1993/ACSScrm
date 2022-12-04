import { Link } from "react-router-dom";

//styles
import "./customersList.css";

export default function CustomerList({ customers }) {
  return (
    <div className="project-list">
      {customers.length === 0 && <p>No Customers yet!</p>}
      {customers.map((customer) => (
        <Link to={`/customerDetail/${customer.id}`} key={customer.id}>
          <h4>{customer.name}</h4>
        </Link>
      ))}
    </div>
  );
}
