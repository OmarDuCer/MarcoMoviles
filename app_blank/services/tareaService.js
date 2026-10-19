import apiClient from '../api/client';

export async function getTask() {
    const res = await apiClient.get('/tareas');
    return res.data;    
}

export async function getTaskById(id) {
    const res = await apiClient.get(`/tareas/${id}`);
    return res.data;    
}

export async function createTask(tarea) {
    const res = await apiClient.post('/tareas', tarea);
    return res.data;    
}

export async function deleteTask(id) {
    const res = await apiClient.delete(`/tareas/${id}`);
    return res.data;    
}

export async function updateTask(id, tarea) {
    const res = await apiClient.put(`/tareas/${id}`, tarea);
    return res.data;    
}   
