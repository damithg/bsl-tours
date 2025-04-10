import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Inquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  travelDates?: string;
  packageInterest?: string;
  message: string;
  subscribed: boolean;
  createdAt: string;
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load inquiries from localStorage
    try {
      const storedInquiries = localStorage.getItem('inquiries');
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }
    } catch (error) {
      console.error('Error loading inquiries:', error);
      toast({
        title: 'Error Loading Inquiries',
        description: 'Could not load locally stored inquiries.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const clearInquiries = () => {
    if (window.confirm('Are you sure you want to clear all locally stored inquiries?')) {
      localStorage.removeItem('inquiries');
      setInquiries([]);
      toast({
        title: 'Inquiries Cleared',
        description: 'All locally stored inquiries have been cleared.',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077B6]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Temporary Admin: Local Inquiries</h1>
        <button
          onClick={clearInquiries}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Clear All Inquiries
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No inquiries found in local storage.</p>
            <p className="mt-2 text-sm">When the API endpoint is unavailable, form submissions are saved locally.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Dates</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inquiry.firstName} {inquiry.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`mailto:${inquiry.email}`} className="text-[#0077B6] hover:underline">
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inquiry.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inquiry.travelDates || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inquiry.packageInterest || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {inquiry.message.length > 100 
                          ? `${inquiry.message.substring(0, 100)}...` 
                          : inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">Temporary Storage Notice</h2>
        <p className="text-yellow-700 mb-3">
          This page displays inquiries stored in the browser's localStorage when the API endpoint is unavailable.
        </p>
        <p className="text-yellow-700 mb-3">
          This is a temporary solution until the .NET Core API endpoint is connected.
        </p>
        <p className="text-yellow-700">
          <strong>Note:</strong> Data stored here is only available on this device and browser and will be 
          lost if the browser storage is cleared.
        </p>
      </div>
    </div>
  );
};

export default AdminInquiries;