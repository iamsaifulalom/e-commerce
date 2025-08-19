import InputField from "../../globalComponents/InputField"
import SelectOptions from "../../globalComponents/SelectOptions"
import DescriptionField from "../../globalComponents/DescriptionField"

const options = [
    { _id: "ঈদগাহ বাজার ", name: "ঈদগাহ বাজার" },
]

export default function ShipingAddress({ setShippingAddress }) {

    function handleChange(e) {
        const { name, value } = e.target
        setShippingAddress(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="border w-full p-4 rounded">
            <h1 className="heading">আপনার ঠিকানা</h1>
            <InputField
                label="আপনার নাম"
                placeholder="আপনার নাম"
                name="name"
                onChange={handleChange}
            />
            <InputField
                type="tel"
                label="ফোন নাম্বার"
                placeholder="01xxxxxxxxx"
                name="phoneNumber"
                onChange={handleChange}
            />
            <InputField
                type="tel"
                label="ইমার্জেন্সি ফোন নাম্বার (অপশনাল)"
                placeholder="01xxxxxxxxx"
                name="secondPhoneNumber"
                onChange={handleChange}
            />
            <SelectOptions
                label="এরিয়া"
                name="area"
                clearValue="আপনার এরিয়া সিলেক্ট করুণ"
                options={options}
                className="border rounded-full px-3 py-2"
                onChange={handleChange}
            />
            <InputField
                label="গ্রাম"
                placeholder="আপনার গ্রামের নাম"
                name="village"
                onChange={handleChange}
            />
            <DescriptionField
                label="পূর্ন ঠিকানা"
                placeholder="আপনার আশপাশের পরিচিত কোন ঠিকানা।"
                name="fullAddress"
                onChange={handleChange}
            />

        </div>
    )
}
