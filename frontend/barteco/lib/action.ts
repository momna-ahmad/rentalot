'use server'

//server actions for sign in 

import { signIn } from '@/auth' ;
import { AuthError  } from 'next-auth';
import { signOut } from '@/auth';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  
  try {
     const result = await signIn('credentials', formData);
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }

  
}

export async function signout(){
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    headers:{
      withCredentials: 'include'
    }
  });
  return await signOut({ redirectTo: '/' });
}

export async function handleSubmit(prevState:  any ,
  formData: FormData) {
  const session = await auth() ;
  const id = session?.user?.id ;
  
  const title = formData.get('title') as string ;
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const unit = formData.get('unit') as string ;
  const category = formData.get('category') as string ;
  const location =  formData.get('location') as string ;


const payload = new FormData();
payload.append('title',  title);
payload.append('description', description);
payload.append('price',price );
payload.append('unit', unit );
payload.append('category', category);
payload.append('location', location);

const files = formData.getAll('images') as File[];
// Append files
files?.forEach((file) => {
  payload.append('images', file);
});

  //not using application json becz backend cant read files as json
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-listings/${id}`, {
    method: 'POST',
    headers:{
      
      Authorization: `Bearer ${(session?.user as any).token}` ,
    },
    body: payload
  });

  if (!res.ok) {
    
    const {error} = await res.json(); // read error message
    return {
      error,
      title, description, price, unit, category , location
    }
  }

  // Optional: handle response
  const result = await res.json();
  return redirect('/dashboard/lister') ;
}

export async function editProfile(prevState:  any ,
  formData: FormData) {
  const session = await auth() ;
  
  const name = formData.get('name') as string ;
  const about = formData.get('about') as string
  const phone = formData.get('phone') as string;

const payload = new FormData();
payload.append('name',  name);
payload.append('about', about);
payload.append('phone', phone );


const file = formData.get('image') as File;
// Append files

  payload.append('image', file);


  //not using application json becz backend cant read files as json
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit-profile`, {
    method: 'POST',
    headers:{
      Authorization: `Bearer ${(session?.user as any).token}` ,
    },
    body: payload
  });

  if (!res.ok) {
    
    const {error} = await res.json(); // read error message
    return error ;
  }

  // Optional: handle response
  const result = await res.json();
  return redirect('/dashboard/lister/profile') ;
}

