import api from '../../lib/api'

// Example on how to use the API in content scripts
const getJoke = async () => {
  const joke = await api.getDadJoke()
  console.log(joke)
}

getJoke()
