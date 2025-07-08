import { SignIn } from "@clerk/nextjs"

const LoginPage = () => {
  return (
    <div className=" w-screen flex justify-center items-start mt-10">
      <SignIn />
    </div>
  )
}
export default LoginPage