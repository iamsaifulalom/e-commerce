import useSignInForm from '../hooks/useSignInForm'
import useSignInAction from '../hooks/useSignInAction'
import InputField from '../componnents/ui/InputField'
import PasswordField from '../componnents/ui/PasswordField'
import Button from '../componnents/ui/Button'
import Toast from '../componnents/ui/Toast'

export default function SignIn() {

  const { userData, handleChange } = useSignInForm()
  const { isLoading, error, setError, handleSignIn } = useSignInAction()


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toast danger message={error} onClick={() => setError(null)} />
      <div className="w-[320px] p-4 border rounded border-gray-300">
        <InputField
        autoComplete="off"
          label="Phone number"
          placeholder="01xxxxxxxxx"
          name="phoneNumber"
          onChange={handleChange}
        />
        <PasswordField
          label="Password"
          placeholder="01xxxxxxxxx"
          onChange={handleChange}
        />
        <Button
          isLoading={isLoading}
          onClick={() => handleSignIn(userData)}
          variant="primary"
          text="Sign in"
        />
      </div>
    </div>
  )
}

