import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

// styles
import "./createCustomer.css";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("customers");
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  //form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [logo, setLogo] = useState("");
  const [customerNotes, setCustomerNotes] = useState([]);
  const [formError, setFormError] = useState(null);

  return (
    <div>
      <h4>CreateCustomer</h4>
    </div>
  );
}
