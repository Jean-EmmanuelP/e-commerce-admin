import Layout from '@/components/Layout';
import { usePathname } from 'next/navigation';

export default function EditProductPage() {
    const pathname = usePathname()
    console.log({pathname})
    return (
        <Layout>
            edit product form here
        </Layout>
    )
}