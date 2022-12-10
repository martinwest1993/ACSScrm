import { Link } from "react-router-dom";

//styles
import "./customersList.css";

export default function CustomerList({ customers }) {
  return (
    <div className="customer-list">
      {customers.length === 0 && <p>No Customers yet!</p>}
      {customers.map((customer) => (
        <Link
          to={`/customerDetail/${customer.id}`}
          key={customer.id}
          style={{
            backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
              ),url(${customer.logoURL})`,
            backgroundPosition: "center",
            color: "#fff",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h4>{customer.name}</h4>
        </Link>
      ))}
    </div>
  );
}
