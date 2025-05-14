// Archivo: src/app/(crm)/dashboard/sales/[id]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import SalesDetail from './SalesDetail';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="p-4">
      <SalesDetail
        orderId={parseInt(params.id)}
        onBack={() => router.back()}
      />
    </div>
  );
}
