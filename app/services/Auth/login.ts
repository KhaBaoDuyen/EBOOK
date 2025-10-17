 export async function Login(){
    const data = await fetch("/api/auth/login");
    const login = await data.json();
    return login;
 }