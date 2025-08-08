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
    await signIn('credentials', formData);
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
  return await signOut({ redirectTo: '/' });
}

export async function handleSubmit(prevState:  any ,
  formData: FormData) {
  const session = await auth() ;
  console.log(session) ;
  const id = session?.user?.id ;
  console.log(id) ;
  
  const title = formData.get('title') as string ;
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const unit = formData.get('unit') as string
  const category = formData.get('category') as string
const payload = new FormData();
payload.append('title',  title);
payload.append('description', description);
payload.append('price',price );
payload.append('unit', unit );
payload.append('category', category);

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
    console.log('error in action') ;
    const {error} = await res.json(); // read error message
    return {
      error,
      title, description, price, unit, category 
    }
  }

  // Optional: handle response
  const result = await res.json();
  console.log('Upload success:', result);
  return redirect('/dashboard/lister') ;
}