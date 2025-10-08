export async function bookByRating() {
    try {
        const res = await fetch("/api/user/groupCategogy");

        if(!res.ok){
            const text = await res.text();
            throw new Error(`Error : ${res.status} - ${text}`);
        }
        return await res.json();
    }catch(err:any){
        console.log("loi", err.message);
        
    } 
}