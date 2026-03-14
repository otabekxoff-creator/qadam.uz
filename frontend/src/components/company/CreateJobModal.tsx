import { useState } from 'react';
import Modal from '../ui/Modal';

interface CreateJobModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'FULL_TIME',
    category: 'IT',
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
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ish e\'lon qilishda xatolik');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Yangi ish e'lon qilish">
      {error && (
        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lavozim</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="Masalan: Frontend Developer"
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
            placeholder="Ish haqida batafsil ma'lumot..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Talablar</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="input-field min-h-24"
            placeholder="Nomzodga qo'yiladigan talablar..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joylashuv</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="Toshkent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maosh</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="input-field"
              placeholder="5 000 000 so'm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ish turi</label>
            <select name="type" value={formData.type} onChange={handleChange} className="input-field">
              <option value="FULL_TIME">To'liq stavka</option>
              <option value="PART_TIME">Yarim stavka</option>
              <option value="INTERNSHIP">Amaliyot</option>
              <option value="REMOTE">Masofaviy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
            <select name="category" value={formData.category} onChange={handleChange} className="input-field">
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
              <option value="DESIGN">Dizayn</option>
              <option value="FINANCE">Moliya</option>
              <option value="EDUCATION">Ta'lim</option>
              <option value="OTHER">Boshqa</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Bekor qilish
          </button>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? 'E\'lon qilinmoqda...' : 'E\'lon qilish'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateJobModal;
