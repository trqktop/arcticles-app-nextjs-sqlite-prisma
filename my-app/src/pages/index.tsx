import 'reflect-metadata'
import useSWR from 'swr'

function fetcher(url: string) {

  return fetch(url)
    .then(res => {
      if (res.headers.get('content-type')?.includes('application/json')) {
        return res.json()
      } else {
        console.log('Not a JSON response')
        return []
      }
    })
    .catch(err => {
      console.log(err)
      return []
    })
}

function Users() {
  const { data, mutate } = useSWR('/api/users', fetcher)
  console.log(data, 'users!!')
  const { data: news } = useSWR('/api/news', fetcher)
  console.log(news, 'news!!')

  if (data)
    return (
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    )
  return null
}

export default Users