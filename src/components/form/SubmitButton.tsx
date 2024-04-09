import { Button } from "../ui/button";

export default function SubmitButton({ title }: { title: string }) {
  return (
    <Button
      className="w-full rounded-full bg-blue-500 hover:bg-blue-400 text-lg p-7"
      type="submit"
    >
      {title}
    </Button>
  );
}
