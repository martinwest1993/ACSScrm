import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

// styles
import "./createCustomer.css";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("customers");

  //form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const [address, setAddress] = useState("");
  const [customerBugTrack, setCustomerBugTrack] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const customer = {
      name,
      email,
      contactNumber,
      logo,
      customerBugs: [],
      address,
      complaints: [],
      invoiceHistory: [],
    };
    console.log(customer);
    await addDocument(customer);
    if (!response.error) {
      navigate("/customers");
    }
  };

  const handleFileChange = () => {};
  return (
    <div className="create-form">
      <h2 className="page-title"> Add A New Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Company Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Contact Email:</span>
          <textarea
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></textarea>
        </label>
        <label>
          <span>Contact Number:</span>
          <input
            required
            type="tel"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
          />
        </label>
        <label>
          <span>Company Address:</span>
          <input
            required
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        <label>
          <span>Add company Logo:</span>
          <input type="file" onChange={handleFileChange} />
          {logoError && <div className="error">{logoError}</div>}
        </label>
        <button className="btn">Add Customer</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
