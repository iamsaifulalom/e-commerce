import { useState } from "react";
import InputField from "../componnents/ui/InputField"
import SelectOptions from "../componnents/ui/SelectOptions"
import Button from "../componnents/ui/Button"
import Toast from "../componnents/ui/Toast"
import useCreateUser from "../hooks/useCreateUser";
import useGetUser from "../hooks/useGetUser";
import useUpdateUser from "../hooks/useUpdateUser";

export default function CreateUser() {

  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    role: "customer"

  })

  const {
    isCreating,
    error,
    createUser,
    setError
  } = useCreateUser()


  // get user to update user data
  const { isLoading } = useGetUser(setUser);
  const { isUpdating, updateUser } = useUpdateUser(setError)

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(p => ({ ...p, [name]: value }))

  }

  return (
    <div className="max-w-xl mx-auto border border-gray-300 p-4 rounded">
      <Toast
        onClick={() => setError(null)}
        danger={true}
        message={error} />
      <h1 className="text-xl font-bold">{user?._id ? "Update user" : "Create user"}</h1>
      <InputField
        value={user.name}
        name="name"
        onChange={handleChange}
        label="Name"
        placeholder="Saiful"
      />
      <InputField
        value={user.phoneNumber}
        name="phoneNumber"
        onChange={handleChange}
        label="Phone number"
        placeholder="01xxxxxxxxx"
      />
      <InputField
        value={user.password}
        name="password"
        onChange={handleChange}
        label="Password"
        placeholder="******"
      />
      <SelectOptions
        defaultValue={user.role}
        name="role"
        onChange={handleChange}
        style="px-3 py-1 rounded-full"
        label="Role"
        options={[
          { _id: "customer", name: "Customer" },
          { _id: "seller", name: "Seller" },
          { _id: "admin", name: "Admin" },
        ]}
      />

      <Button
        isLoading={isCreating || isLoading || isUpdating}
        variant="primary"
        text={user?._id ? "Update user" : "Save user"}
        onClick={() => user?._id ? updateUser(user) : createUser(user)}

      />
    </div>
  );
}