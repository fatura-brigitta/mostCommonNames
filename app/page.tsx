'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [year, setYear] = useState('2024');
  const [limit, setLimit] = useState(5);
  const [boys, setBoys] = useState<string[]>([]);
  const [girls, setGirls] = useState<string[]>([]);

  const fetchData = async () => {
    const res = await fetch('/api/names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year, limit })
    });

    const data = await res.json();
    setBoys(data.boys);
    setGirls(data.girls);
  };

  useEffect(() => {
    fetchData();
  }, [year, limit]);

  const renderList = (list: string[]) => {
    const fullList = [...list];

    while (fullList.length < 10) {
      fullList.push('');
    }

    return fullList.map((name, i) => {
      const isTop1 = i === 0 && name;
      const isTop2 = i === 1 && name;
      const isTop3 = i === 2 && name;

      return (
        <div
          key={i}
          className={`
          flex justify-center items-center px-3 py-2 rounded-lg
          transition-all duration-300 cursor-default

          ${isTop1 ? 'bg-yellow-100 text-yellow-800 font-semibold scale-105 shadow-sm' : ''}
          ${isTop2 ? 'bg-gray-200 text-gray-700' : ''}
          ${isTop3 ? 'bg-orange-100 text-orange-700' : ''}

          ${name ? 'hover:bg-blue-50 hover:shadow-md' : 'opacity-0'}
        `}
        >
          {name && (
            <div className="flex items-center gap-2">
              <span>{i + 1}. {name}</span>

              {i === 0 && <span>🥇</span>}
              {i === 1 && <span>🥈</span>}
              {i === 2 && <span>🥉</span>}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl w-[420px] animate-fadeIn">

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Népszerű nevek
        </h1>

        <div className="flex gap-3 mb-6">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="flex-1 p-2 border rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            {Array.from({ length: 16 }, (_, i) => 2025 - i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="p-2 border rounded-lg shadow-sm hover:border-blue-400 transition"
          >
            {[...Array(8)].map((_, i) => {
              const n = i + 3;
              return (
                <option key={n} value={n}>
                  Top {n}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h2 className="font-semibold text-blue-200 mb-3 text-center">
              👦 Fiúk
            </h2>
              <div className="space-y-1">
                {renderList(boys)}
              </div>

          </div>

          <div>
            <h2 className="font-semibold text-pink-600 mb-3 text-center">
              👧 Lányok
            </h2>
              <div className="space-y-1">
                {renderList(girls)}
              </div>

          </div>

        </div>
      </div>
    </div>
  );
}