import { useState } from 'react';
import Modal from '../ui/Modal';

interface CreateStartupModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateStartupModal: React.FC<CreateStartupModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: 'IT',
    stage: 'IDEA',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/startups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Startap yaratishda xatolik');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Yangi startap yaratish">
      {error && (
        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Startap nomi</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Startap nomi"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field min-h-24"
            placeholder="Startap haqida batafsil ma'lumot..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Soha</label>
            <select name="industry" value={formData.industry} onChange={handleChange} className="input-field">
              <option value="IT">IT</option>
              <option value="EDUCATION">Ta'lim</option>
              <option value="FINTECH">FinTech</option>
              <option value="HEALTHCARE">Sog'liqni saqlash</option>
              <option value="E_COMMERCE">E-commerce</option>
              <option value="AGRICULTURE">Qishloq xo'jaligi</option>
              <option value="OTHER">Boshqa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bosqich</label>
            <select name="stage" value={formData.stage} onChange={handleChange} className="input-field">
              <option value="IDEA">G'oya</option>
              <option value="MVP">MVP</option>
              <option value="GROWTH">O'sish</option>
              <option value="SCALE">Kengayish</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Veb-sayt</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Bekor qilish
          </button>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? 'Yaratilmoqda...' : 'Yaratish'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateStartupModal;
