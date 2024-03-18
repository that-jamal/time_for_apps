import { getData, saveData, updateData, deleteData } from "@/utils/handleDatabase";
import Counter from './timer'
import { revalidateTag } from "next/cache"

export default async function Home() {

  const data = await getData()
  const create = async (formData: FormData) => {
    'use server'
    const time = formData.get("time") as string
    const project = formData.get("project") as string
    const data = await saveData(time, project)
    console.log(data, "working")
    revalidateTag("time")
  }
  const update = async (formData: FormData) => {
    'use server'
    const time = formData.get("time") as string
    const project = formData.get("project") as string
    const id = Number(formData.get("id") as string)
    const data = await updateData(id, time, project)
    console.log(data, id, time, project)
    revalidateTag("time")

  }
  const deleteForm = async (formData: FormData) => {
    'use server'
    const id = Number(formData.get("id") as string)
    const data = await deleteData(id)
    console.log(data)
    revalidateTag("time")
  }


  return (

    <section className="flex min-h-screen flex-col items-center justify-between bg-gray-700">
      <form className="shadow-md shadow-indigo-500 flex flex-col items-center justify-center gap-4 min-h-4 max-w-96 bg-indigo-100 p-5 rounded-md " action={create}>
        <h1 className="text-indigo-950">create project</h1>
        <input className="placeholder-slate-300 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out" type="text" name="project" placeholder="Project" />

        <button className="bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">create project</button>
      </form>
      <div className="flex flex-wrap items-center justify-between p-6 pl-3">
        {data.map(q => (
          <div key={q.id} className="shadow-md shadow-indigo-200 flex flex-col items-center justify-center gap-4 min-h-64 max-w-96 bg-yellow-400  p-5 rounded-md mb-8 ">

            <div className="flex items-center justify-between">
              <form className="flex flex-col items-center" action={update}>
                <input className="placeholder-slate-300 w-60 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-1 py-1 transition-colors duration-300 ease-in-out" type="project" name="project" defaultValue={q.project} placeholder={"Project " + q.id} />

                <button className="mt-4 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">
                  <h1>Update</h1>
                </button>
                <input type="hidden" name="id" value={q.id.toString()} />
              </form>

            </div>
            <Counter initialTime={q.time} id={q.id} project={q.project} update={updateData} />
            <form action={deleteForm}>
              <button className=" flex ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>

              <input type="hidden" name="id" value={q.id} />
            </form>

          </div>
        ))}

      </div>
    </section>

  );
}
