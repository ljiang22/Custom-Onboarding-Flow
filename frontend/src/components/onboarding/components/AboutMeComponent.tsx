interface AboutMeComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AboutMeComponent({ value, onChange }: AboutMeComponentProps) {
  return (
    <div>
      <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
        About Me
      </label>
      <textarea
        id="aboutMe"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Tell us about yourself..."
      />
    </div>
  );
}
