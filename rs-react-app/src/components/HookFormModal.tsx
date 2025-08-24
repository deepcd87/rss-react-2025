import Modal from './Modal';
import HookForm from './HookForm';

interface HookFormModalProps {
  onClose: () => void;
}

const HookFormModal = ({ onClose }: HookFormModalProps) => {
  const handleSubmitSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="React Hook Form">
      <HookForm onSubmitSuccess={handleSubmitSuccess} />
    </Modal>
  );
};

export default HookFormModal;
