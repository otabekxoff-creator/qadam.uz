'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Eye, Trash2, MoreHorizontal, Upload, Folder, Search } from 'lucide-react';
import { useState } from 'react';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: 1,
      name: 'Resume_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-03-15',
      downloads: 12,
      category: 'Resume',
    },
    {
      id: 2,
      name: 'Cover_Letter_Template.docx',
      type: 'DOCX',
      size: '156 KB',
      uploadedAt: '2024-03-10',
      downloads: 8,
      category: 'Templates',
    },
    {
      id: 3,
      name: 'Portfolio.pdf',
      type: 'PDF',
      size: '15.8 MB',
      uploadedAt: '2024-03-01',
      downloads: 25,
      category: 'Portfolio',
    },
    {
      id: 4,
      name: 'Certificates.zip',
      type: 'ZIP',
      size: '8.2 MB',
      uploadedAt: '2024-02-28',
      downloads: 5,
      category: 'Certificates',
    },
    {
      id: 5,
      name: 'Project_References.pdf',
      type: 'PDF',
      size: '3.1 MB',
      uploadedAt: '2024-02-20',
      downloads: 3,
      category: 'References',
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>;
      case 'DOCX':
        return <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">DOC</div>;
      case 'ZIP':
        return <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs">ZIP</div>;
      default:
        return <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">FILE</div>;
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Documents</h1>
            <p className="text-muted-foreground">Manage your resumes, certificates, and other documents</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Storage Info */}
        <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Folder className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold">Storage Usage</p>
                <p className="text-sm text-muted-foreground">2.4 GB of 5 GB used</p>
              </div>
            </div>
            <span className="text-sm font-medium">48%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="w-[48%] h-full bg-primary rounded-full" />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 rounded-lg border bg-background">
            <option value="">All Categories</option>
            <option value="resume">Resume</option>
            <option value="portfolio">Portfolio</option>
            <option value="certificates">Certificates</option>
            <option value="templates">Templates</option>
          </select>
        </div>

        {/* Documents List */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Document</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Size</th>
                <th className="text-left p-4 font-medium">Uploaded</th>
                <th className="text-left p-4 font-medium">Downloads</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-secondary rounded text-sm">{doc.category}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{doc.size}</td>
                  <td className="p-4 text-muted-foreground">{doc.uploadedAt}</td>
                  <td className="p-4">{doc.downloads}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
