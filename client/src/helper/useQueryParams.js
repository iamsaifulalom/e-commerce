import { useLocation } from "react-router-dom"

export default function useQueryParams() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
}