import React from 'react';
import ApprovalPage from './approvalPage';
import { getApproval } from '@/lib/api/artWorks';

const RolesAndApprovalPage = async() => {

    const permission = await getApproval();
    console.log("SERVER PERMISSION:", permission);

    return (

    <ApprovalPage permission={permission} />

    );
}

export default RolesAndApprovalPage;
