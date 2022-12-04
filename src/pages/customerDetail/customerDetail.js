import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { CustomerHeader } from "./customerHeader";
import CustomerPanel from "./customerPanel";
import { Link } from "react-router-dom";
//styles
import "./customerDetail.css";

export default function CustomerDetail() {
  const { id } = useParams();
  const { error, document } = useDocument("customers", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div className="customer-detail">
      <CustomerHeader customer={document} />
      <div className="panel-container">
        <Link to={`/customerDetail/${id}/notes`} className="panel">
          <CustomerPanel title={"Notes"} />
        </Link>
        <Link to={`/customerDetail/${id}/bugLog`} className="panel">
          <CustomerPanel title={"Bug Log"} />
        </Link>
      </div>
    </div>
  );
}
