import CustomerList from "../../components/customersList/customersList";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./customers.css";

export default function Customers() {
  const { documents, error } = useCollection("customers");

  return (
    <div>
      <h2 className="page-title">Customers</h2>
      {error && <p className="error">{error}</p>}
      {documents && <CustomerList customers={documents} />}
    </div>
  );
}
