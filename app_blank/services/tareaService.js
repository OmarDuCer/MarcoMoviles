import apiClient from './apiClient';

export async function getTask() {
    const res = await apiClient.get('/api/getTarea');
    return res.data;    
}

export async function getTaskById(id) {
    const res = await apiClient.get(`/api/tarea/${id}`);
    return res.data;    
}

export async function createTask(tarea) {
    const res = await apiClient.post('/api/tarea', tarea);
    return res.data;    
}

export async function deleteTask(id) {
    const res = await apiClient.delete(`/api/tarea/${id}`);
    return res.data;    
}

export async function updateTask(id, tarea) {
    const res = await apiClient.put(`/api/tarea/${id}`, tarea);
    return res.data;    
}   



