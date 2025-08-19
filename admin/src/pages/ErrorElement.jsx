import { useRouteError } from "react-router-dom"

export default function ErrorElement() {
    const error = useRouteError()
    return (
        <div className="flex text-red-500 justify-center w-full mt-24">
            <h1>
                Somting went wrong. Contact with developer.
            </h1>
        </div>
    );
}