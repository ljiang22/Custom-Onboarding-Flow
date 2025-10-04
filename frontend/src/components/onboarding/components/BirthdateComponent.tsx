interface BirthdateComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BirthdateComponent({ value, onChange }: BirthdateComponentProps) {
  return (
    <div>
      <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
        Birthdate
      </label>
      <input
        type="date"
        id="birthdate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
}
