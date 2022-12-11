import ArchivedProjectsList from "../../components/archivedProjectsList/archivedProjectsList";
import { useCollection } from "../../hooks/useCollection";

//styles
import "./archivedProjects.css";

export default function ArchivedProjects() {
  const { documents, error } = useCollection("projects");

  if (!documents) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div>
      <h2 className="page-title">Archived Projects</h2>
      {console.log(documents)}
      {error && <p className="error">{error}</p>}
      <ArchivedProjectsList projects={documents} />
    </div>
  );
}
