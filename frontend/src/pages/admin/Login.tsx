export function Login(){
    return (
        <div className="px-16 max-w-lg mx-auto my-24">
          <h1 className="text-3xl sm:text-4xl text-center font-extrabold my-7">
            Admin Log in
          </h1>
          <form  className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="email"
              
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              id="password"
              
            />
    
            <button
              
              className="bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 font-semibold"
            >
              Log in
              
            </button>
          </form>
  
        </div>
      );
}