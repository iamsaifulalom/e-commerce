import Button from "../compnents/globalComponents/Button";
import InputField from "../compnents/globalComponents/InputField";
import Toast from "../compnents/globalComponents/Toast";
import useSignInAction from "../hooks/useSignInAction";
import useSignInform from "../hooks/useSignInform";
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

export default function SignIn() {

  const { handleChange, isValid, phoneNumber } = useSignInform();
  const { handleSignIn, isSigning, error, setError } = useSignInAction();
  const navigate = useNavigate()

  return (
    <>
      <Toast onClick={() => setError(null)} danger={true} message={error} />
      <div className="w-[300px] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-slate-800 border p-4 rounded border-gray-300">
        <div className="flex text-white items-center justify-between">
          <FaArrowLeft onClick={() => navigate("/")} size={20} className="cursor-pointer" />
          <h1 className="text-lg  font-bold">সাইন ইন</h1>
        </div>
        <InputField
          style="text-white"
          label="ফোন নাম্বার"
          placeholder="01xxxxxxxxx"
          name="phoneNumber"
          onChange={handleChange}
          isValid={isValid}
        />
        <Button
          disabled={!isValid}
          isLoading={isSigning}
          onClick={() => handleSignIn(phoneNumber)}
          style="w-full mt-5"
          variant="primary"
          text="সাইন ইন করুন"
        />
      </div>
    </>
  )
}
