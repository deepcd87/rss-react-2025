import { useEffect, useState } from 'react';
import { useStore } from '../store/store';

interface MainPageProps {
  onOpenUncontrolled: () => void;
  onOpenHookForm: () => void;
}

const MainPage = ({ onOpenUncontrolled, onOpenHookForm }: MainPageProps) => {
  const { forms } = useStore();
  const [newSubmissionId, setNewSubmissionId] = useState<number | null>(null);

  useEffect(() => {
    if (forms.length > 0) {
      setNewSubmissionId(forms[forms.length - 1].id);

      const timer = setTimeout(() => {
        setNewSubmissionId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [forms]);

  return (
    <div className="main-page">
      <h1>Form Submissions</h1>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onOpenUncontrolled}>
          Open Uncontrolled Form
        </button>
        <button className="btn btn-secondary" onClick={onOpenHookForm}>
          Open React Hook Form
        </button>
      </div>

      <div className="submissions-grid">
        {forms.map((form) => (
          <div
            key={form.id}
            className={`submission-card ${newSubmissionId === form.id ? 'highlight' : ''}`}
          >
            <h3>{form.name}</h3>
            <p>Age: {form.age}</p>
            <p>Email: {form.email}</p>
            <p>Gender: {form.gender}</p>
            <p>Country: {form.country}</p>
            <p>Submitted: {form.createdAt.toLocaleString()}</p>
            {form.picture && (
              <div className="picture-preview">
                <img src={form.picture} alt="Uploaded" />
              </div>
            )}
          </div>
        ))}

        {forms.length === 0 && (
          <div className="empty-state">
            <p>No form submissions yet. Click a button above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
