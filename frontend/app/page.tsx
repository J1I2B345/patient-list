'use client';
import axios from 'axios';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  photoUrl: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/patients')
      .then(({ data }) => {
        return setUsers(data?.data || []);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? (
          <>loading...</>
        ) : (
          <>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              {users.length === 0 ? (
                <>empty state</>
              ) : (
                users.map((e) => (
                  <li key={e.id} className="mb-2">
                    {e.name}
                    <Image
                      src={e.photoUrl}
                      width={100}
                      height={100}
                      alt={`${e.name}`}
                      loading="lazy"
                      placeholder="empty"
                    />
                  </li>
                ))
              )}
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <button
                onClick={() => {
                  redirect('/form');
                }}
              >
                Add patient
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export const Form = () => {
  return <form></form>;
};
