import Modal from './Modal';
import UncontrolledForm from './UncontrolledForm';

interface UncontrolledFormModalProps {
  onClose: () => void;
}

const UncontrolledFormModal = ({ onClose }: UncontrolledFormModalProps) => {
  const handleSubmitSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Uncontrolled Form">
      <UncontrolledForm onSubmitSuccess={handleSubmitSuccess} />
    </Modal>
  );
};

export default UncontrolledFormModal;
