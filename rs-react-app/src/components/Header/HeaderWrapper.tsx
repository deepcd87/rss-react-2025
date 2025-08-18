'use client';
import { useRouter } from 'next/navigation';
import Header from './Header';

const HeaderWrapper = () => {
  const router = useRouter();

  const handleSearchSubmit = (term: string) => {
    const params = new URLSearchParams();
    if (term) params.set('search', term);
    router.push(`/?${params.toString()}`);
  };

  return <Header onSearchSubmit={handleSearchSubmit} />;
};

export default HeaderWrapper;
