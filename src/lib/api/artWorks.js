
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getJobs = async () =>{
//     return serverFetch('/api/jobs')
// }

export const getArtWorks = async (artWorksId , status = 'active') => {
    const res = await fetch(`${baseUrl}/api/artWorks?artWorksId=${artWorksId}&status=${status}`);
    return res.json();
}