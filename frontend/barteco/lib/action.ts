'use server'

//server actions for sign in 

import { signIn , signOut} from '@/auth' ;
import { AuthError  } from 'next-auth';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { CustomSessionUser } from '@/auth.config';
import { Booking } from '@/components/bookings';

interface HandleSubmitState {
  title?: string;
  description?: string;
  price?: string;
  unit?: string;
  category?: string;
  location?: string;
  error?: string | null;
}

interface HandleBookingState {
  owner?: string;
  booked?: Booking[]; // You might want to create a more specific type for bookings
  error?: string | undefined;
  success?: boolean;
  listing?: string;
  duration?: string;
  start?: string;
  unit?: string;
  cost?: string;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  
  try {
      await signIn('credentials', formData);
    
  } catch (error) {
    console.log("Error in sign in: ", error);
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

export async function handleSubmit(prevState:  HandleSubmitState | undefined ,
  formData: FormData) {
  const session = await auth();
  const user = session?.user as CustomSessionUser;
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

console.log('payload' , payload) ;
  //not using application json becz backend cant read files as json
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-listings/${user.id}`, {
    method: 'POST',
    headers:{
      
      Authorization: `Bearer ${user.token}` ,
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

export async function handleBooking(prevState: HandleBookingState , formData: FormData) {

  const { owner, booked } = prevState;
  const session = await auth();
  const user = session?.user as CustomSessionUser;

  const listing = formData.get('listing')?.toString();
  const duration = Number(formData.get('duration')?.toString() || 0);
  const startStr = formData.get('start')?.toString();
  const unit = formData.get('unit')?.toString();
  const cost = formData.get('cost')?.toString();

  if (!startStr || !duration || !unit) {
    return { ...prevState, error: 'Invalid booking details.' };
  }

  const start = new Date(startStr);
  const end =
    unit === 'day'
      ? new Date(start.getTime() + duration * 24 * 60 * 60 * 1000)
      : new Date(start.getTime() + duration * 60 * 60 * 1000);

  // ✅ Normalize times for day-based bookings
  const normalizedStart = new Date(start);
  const normalizedEnd = new Date(end);
  if (unit === 'day') {
    normalizedStart.setHours(0, 0, 0, 0);
    normalizedEnd.setHours(23, 59, 59, 999);
  }

  // ✅ Overlap check (handles both hour and day cases)
  const overlap = booked?.some((b: Booking) => {
    const bStart = new Date(b.start_date_time);
    const bEnd = new Date(b.end_date_time);

    if (unit === 'day') {
      // Compare only dates (ignore hours)
      const bookingStart = new Date(bStart);
      const bookingEnd = new Date(bEnd);
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(23, 59, 59, 999);
      return normalizedStart <= bookingEnd && normalizedEnd >= bookingStart;
    } else {
      // Compare exact time ranges (hour slots)
      return start < bEnd && end > bStart;
    }
  });

  if (overlap) {
    return {
      ...prevState,
      error:
        unit === 'day'
          ? 'This date overlaps with an existing booking.'
          : 'This time slot overlaps with an existing booking.',
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book-listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        listing,
        owner,
        duration,
        start: start.toISOString(),
        end: end.toISOString(),
        unit,
        cost,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        ...prevState,
        error: errorData.error?.message || 'Failed to book listing',
      };
    }

    return {
      ...prevState,
      success: true,
    };
  } catch (err) {
    console.error('Booking failed:', err);
    return {
      ...prevState,
      error: 'Something went wrong. Please try again.',
    };
  }
}

export async function editProfile(
  formData: FormData) {
  const session = await auth();
  const user = session?.user as CustomSessionUser;
  
  const name = formData.get('name') as string ;
  const about = formData.get('about') as string
  const phone = formData.get('phone') as string;

const payload = new FormData();
payload.append('name',  name);
payload.append('about', about);
payload.append('phone', phone );


const file = formData.get('image') as File;
// Append files
//to allow for no profile pic
  if (file && file.size > 0) {
  payload.append('image', file);
}


  //not using application json becz backend cant read files as json
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit-profile`, {
    method: 'POST',
    headers:{
      Authorization: `Bearer ${user.token}` ,
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