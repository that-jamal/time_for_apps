import { db } from './db'


export async function getData() {
    const data = await db.query('SELECT * FROM projects')
    return data.rows
}

export async function saveData(time: number, project: string) {
    try {
        await db.query("INSERT INTO projects(project, time) VALUES ($1, $2)", [project, time])
        return 'Saved fr fr!'
    } catch (error) {
        console.log(error)
        return 'Somthing went wrong'
    }
}

export async function updateData(id: number, time: number, project: string) {
    "use server"
    try {
        await db.query("UPDATE projects SET project = $1, time = $2 WHERE id = $3", [project, time, id])
        return 'Updated'
    } catch (error) {
        console.log(error)
        return 'wrong'
    }
}

export async function deleteData(id: number) {
    try {
        await db.query("DELETE FROM projects WHERE id = $1", [id])
        return 'Deleted'
    } catch (error) {
        console.log(error)
        return 'Somthing went wrong'
    }
}