'use client'
import { useFormStatus } from 'react-dom'
export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className='btn btn-primary ml-3' type="submit" disabled={pending}>
      Add
    </button>
  )
}