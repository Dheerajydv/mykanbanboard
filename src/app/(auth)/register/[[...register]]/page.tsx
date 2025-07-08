import { SignUp } from "@clerk/nextjs"

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-start mt-10">
      <SignUp />
    </div>
  )
}
export default RegisterPage