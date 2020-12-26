import Axios from 'axios'

export async function addRecord(payload) {
  const res = await Axios.post('/api/record/add', {record: payload})
  return res
}
