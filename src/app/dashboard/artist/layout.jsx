import { requireRole } from '@/lib/core/session';
import React from 'react';

const ArtistLayoutPage = async({children}) => {

await requireRole('artist')

    return children;
}

export default ArtistLayoutPage;
