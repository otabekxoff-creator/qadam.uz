'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  applications: number;
  createdAt: string;
}

interface JobCardCompanyProps {
  job: Job;
  onUpdate: () => void;
}

const JobCardCompany: React.FC<JobCardCompanyProps> = ({ job, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      FULL_TIME: 'To\'liq stavka',
      PART_TIME: 'Yarim stavka',
      INTERNSHIP: 'Amaliyot',
      REMOTE: 'Masofaviy',
    };
    return types[type] || type;
  };

  const handleDelete = async () => {
    if (!confirm('Rostdan ham bu ish e\'lonini o\'chirmoqchimisiz?')) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/jobs/${job.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('O\'chirishda xatolik');
      }

      onUpdate();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('O\'chirishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-dark-900">{job.title}</h3>
            <span className={`badge ${job.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
              {job.status === 'ACTIVE' ? 'Faol' : 'Nofaol'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{job.location}</span>
            <span>{getTypeLabel(job.type)}</span>
            <span>{job.applications} ariza</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.id}`}
            className="btn-secondary py-1 px-3 text-sm"
          >
            Ko'rish
          </Link>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="py-1 px-3 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardCompany;
