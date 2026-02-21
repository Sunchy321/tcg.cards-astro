import { Input } from "./input"

export function SearchInput() {
  return (
    <Input
      type="text"
      id="userInput"
      autoFocus
      className="w-[90%] md:w-[75%] px-6 py-6 text-xl bg-white border-none rounded-xl outline-none shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-200 focus:shadow-[0_20px_60px_rgba(0,0,0,0.4)] focus:-translate-y-0.5"
    />
  )
}
