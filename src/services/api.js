import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000',
})

export async function parseText(text) {
  try {
    const { data } = await api.post('/api/parse', { text })
    if (data.error) {
      throw new Error(data.error)
    }
    return data // { title, start, end }
  } catch (error) {
    console.error('Parse error:', error)
    throw new Error('Не успях да разбера текста. Опитай да преформулираш')
  }
}

export async function createEvent(payload) {
  const { data } = await api.post('/events', payload)
  return data // saved event
}

export async function listEvents() {
  const { data } = await api.get('/events')
  return data // array of events
}

export async function deleteEvent(eventId) {
  const { data } = await api.delete(`/events/${eventId}`)
  return data
}

export default api