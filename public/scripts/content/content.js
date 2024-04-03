import api from '../../lib/api' // Adjust the path as necessary

const getJoke = async () => {
  const joke = await api.getDadJoke()
  console.log(joke)
}

getJoke()
