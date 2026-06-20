
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getJobs = async () =>{
//     return serverFetch('/api/jobs')
// }


export const getArtWorks = async () => {
  const res = await fetch(`${baseUrl}/api/artWorks`, {
    cache: "no-store",
  });

  return res.json();
};