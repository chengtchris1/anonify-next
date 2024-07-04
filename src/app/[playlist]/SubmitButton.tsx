'use client'
import { useFormStatus } from 'react-dom'
export default function SubmitButton({additionalConditions, children} :{additionalConditions?: boolean, children?: React.ReactNode}) {
  const { pending } = useFormStatus()
  return (
    <button className='btn btn-primary ml-3' type="submit" disabled={pending || additionalConditions }>
      {pending ? "Loading" :
       children ? children : 'Add'}
    </button>
  )
}