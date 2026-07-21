function some_json(response:Response){
  return response.status<400&&response.json();
}

export function check_online(callback: (jah: any) => void){
  // if (window.location.hostname !== 'localhost')
  fetch('/api/users/info',{cache:"no-store"})
  .then(some_json)
  .then(jah=>typeof(callback)==='function'&&callback(jah))
  .catch(console.error);
}

export async function post_storage(the_store:any){
  try {
    return await fetch('/api/users/storage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(the_store)
    });
  } catch (data) {
    return console.error(data);
  }
}

export async function get_storage(){
  try {
    const response = await fetch('/api/users/storage', {
      cache: 'no-store'
    });
    return some_json(response);
  } catch (data) {
    return console.error(data);
  }
}

