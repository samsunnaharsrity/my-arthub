import React from 'react';
import CreateANewPage from './CreateANewPage';
import { getLoggedInArtistData } from '@/lib/api/artistProfile';

const CreateArtsPage = async() => {


const arts = await getLoggedInArtistData();

    return (
        <div>
            <CreateANewPage arts={arts}></CreateANewPage>
        </div>
    );
}

export default CreateArtsPage;
