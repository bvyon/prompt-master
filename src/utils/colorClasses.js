// Utility to map operator color key to Tailwind class strings
const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    bgSolid: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-700',
    textSolid: 'text-white'
  },
  purple: {
    bg: 'bg-purple-50',
    bgSolid: 'bg-purple-500',
    border: 'border-purple-500',
    text: 'text-purple-700',
    textSolid: 'text-white'
  },
  green: {
    bg: 'bg-green-50',
    bgSolid: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-700',
    textSolid: 'text-white'
  },
  red: {
    bg: 'bg-red-50',
    bgSolid: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-700',
    textSolid: 'text-white'
  },
  yellow: {
    bg: 'bg-yellow-50',
    bgSolid: 'bg-yellow-500',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    textSolid: 'text-white'
  },
  pink: {
    bg: 'bg-pink-50',
    bgSolid: 'bg-pink-500',
    border: 'border-pink-500',
    text: 'text-pink-700',
    textSolid: 'text-white'
  },
  indigo: {
    bg: 'bg-indigo-50',
    bgSolid: 'bg-indigo-500',
    border: 'border-indigo-500',
    text: 'text-indigo-700',
    textSolid: 'text-white'
  },
  gray: {
    bg: 'bg-gray-50',
    bgSolid: 'bg-gray-500',
    border: 'border-gray-500',
    text: 'text-gray-700',
    textSolid: 'text-white'
  },
  // Additional colors from operators.json
  violet: {
    bg: 'bg-violet-50',
    bgSolid: 'bg-violet-500',
    border: 'border-violet-500',
    text: 'text-violet-700',
    textSolid: 'text-white'
  },
  teal: {
    bg: 'bg-teal-50',
    bgSolid: 'bg-teal-500',
    border: 'border-teal-500',
    text: 'text-teal-700',
    textSolid: 'text-white'
  },
  amber: {
    bg: 'bg-amber-50',
    bgSolid: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-700',
    textSolid: 'text-white'
  },
  slate: {
    bg: 'bg-slate-50',
    bgSolid: 'bg-slate-500',
    border: 'border-slate-500',
    text: 'text-slate-700',
    textSolid: 'text-white'
  },
  cyan: {
    bg: 'bg-cyan-50',
    bgSolid: 'bg-cyan-500',
    border: 'border-cyan-500',
    text: 'text-cyan-700',
    textSolid: 'text-white'
  },
  orange: {
    bg: 'bg-orange-50',
    bgSolid: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-700',
    textSolid: 'text-white'
  },
  sky: {
    bg: 'bg-sky-50',
    bgSolid: 'bg-sky-500',
    border: 'border-sky-500',
    text: 'text-sky-700',
    textSolid: 'text-white'
  },
  emerald: {
    bg: 'bg-emerald-50',
    bgSolid: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-700',
    textSolid: 'text-white'
  },
  lime: {
    bg: 'bg-lime-50',
    bgSolid: 'bg-lime-500',
    border: 'border-lime-500',
    text: 'text-lime-700',
    textSolid: 'text-white'
  },
  rose: {
    bg: 'bg-rose-50',
    bgSolid: 'bg-rose-500',
    border: 'border-rose-500',
    text: 'text-rose-700',
    textSolid: 'text-white'
  }
};

export function getColorClasses(colorKey) {
  return colorMap[colorKey] || colorMap.gray;
}

export default { getColorClasses };
