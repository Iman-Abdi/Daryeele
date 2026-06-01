import supabase from './supabase'


export const signUp = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) return { error }


  await supabase.from('users').update({
    username
  }).eq('id', data.user.id)

  return { data }
}


export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { data, error }
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data?.user
}