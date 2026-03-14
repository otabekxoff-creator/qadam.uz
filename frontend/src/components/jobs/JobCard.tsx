import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  company: {
    id: string;
    companyName: string;
    logo: string | null;
  };
  createdAt: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      FULL_TIME: 'To\'liq stavka',
      PART_TIME: 'Yarim stavka',
      INTERNSHIP: 'Amaliyot',
      REMOTE: 'Masofaviy',
    };
    return types[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/jobs/${job.id}`} className="card hover:shadow-lg transition-shadow block">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {job.company.logo ? (
            <img src={job.company.logo} alt="" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-primary-900 font-bold">
              {job.company.companyName.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-dark-900 truncate">{job.title}</h3>
          <p className="text-gray-600 truncate">{job.company.companyName}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge-primary text-xs">{getTypeLabel(job.type)}</span>
        <span className="badge-secondary text-xs">{job.location}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        {job.salary ? (
          <span className="text-primary-900 font-semibold">{job.salary}</span>
        ) : (
          <span className="text-gray-400">Kelishiladi</span>
        )}
        <span className="text-gray-500">{formatDate(job.createdAt)}</span>
      </div>
    </Link>
  );
};

export default JobCard;
