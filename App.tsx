import React, { useState, useEffect } from 'react';
import { Bell, Filter, Search } from 'lucide-react';

interface Subscriber {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  amount: number;
  startDate: string;
  endDate: string;
}

function App() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filterExpired, setFilterExpired] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    amount: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      amount: Number(formData.amount),
      startDate: formData.startDate,
      endDate: formData.endDate
    };
    setSubscribers([...subscribers, newSubscriber]);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      amount: '',
      startDate: '',
      endDate: ''
    });
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isNearingExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const filteredSubscribers = filterExpired
    ? subscribers.filter(sub => isExpired(sub.endDate))
    : subscribers;

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">نظام إدارة الاشتراكات</h1>
        
        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">إضافة مشترك جديد</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اللقب</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المبلغ</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ بداية الاشتراك</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ نهاية الاشتراك</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              إضافة مشترك
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h2 className="text-xl font-semibold">الفلترة</h2>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filterExpired}
                onChange={(e) => setFilterExpired(e.target.checked)}
                className="rounded"
              />
              <span>عرض المشتركين منتهي الصلاحية فقط</span>
            </label>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">قائمة المشتركين</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الاسم الكامل</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">رقم الهاتف</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">المبلغ</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تاريخ البداية</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تاريخ النهاية</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subscriber.firstName} {subscriber.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscriber.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscriber.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscriber.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscriber.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isExpired(subscriber.endDate) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          منتهي الصلاحية
                        </span>
                      ) : isNearingExpiry(subscriber.endDate) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Bell className="h-4 w-4 ml-1" />
                          يقترب موعد الانتهاء
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          نشط
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;